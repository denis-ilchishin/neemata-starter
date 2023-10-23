import { Client } from '@neemata/client'
import { fileURLToPath } from 'node:url'
import { Worker, isMainThread, parentPort, threadId } from 'node:worker_threads'

const CONCURRENCY = 300
const THREADS = 4
const USE_HTTP = false
const PROCEDURE = 'bench'
const DATA = undefined

export class PoolError extends Error {}

export class Pool {
  #items
  #free

  defaultTimeout
  queue

  constructor(options) {
    this.defaultTimeout = options.timeout || 0
    this.#items = new Set()
    this.#free = new Set()
    this.queue = []
  }

  async next(timeout = this.defaultTimeout) {
    if (this.#items.size === 0) throw new PoolError('Pool is empty')
    if (this.#free.size === 0) {
      return new Promise((resolve, reject) => {
        const queueEntry = { resolve, timer: null }
        queueEntry.timer = timeout
          ? setTimeout(() => {
              queueEntry.resolve = null
              this.queue.shift()
              reject(new PoolError('pull item timeout'))
            }, timeout)
          : null
        this.queue.push(queueEntry)
      })
    }
    return this.#free.values().next().value
  }

  add(item) {
    if (typeof item === 'undefined' || item === null)
      throw new PoolError('Item is undefined or null')
    if (this.#items.has(item)) throw new PoolError('Item is already in pool')
    this.#items.add(item)
    this.#free.add(item)
  }

  async capture(timeout = this.defaultTimeout) {
    const item = await this.next(timeout)
    this.#free.delete(item)
    return item
  }

  release(item) {
    if (!this.#items.has(item)) throw new PoolError('Release unexpected item')
    if (this.#free.has(item)) throw new PoolError('Release not captured item')
    this.#free.add(item)
    if (this.queue.length > 0) {
      const { resolve, timer } = this.queue.shift()
      if (timer) clearTimeout(timer)
      if (resolve) resolve(item)
    }
  }

  isFree(item) {
    return this.#free.has(item)
  }

  remove(item) {
    if (!this.#items.has(item)) throw new PoolError('Remove unexpected item')
    this.#free.delete(item)
    this.#items.delete(item)
  }

  get items() {
    return Array.from(this.#items)
  }

  get free() {
    return Array.from(this.#free)
  }
}

if (isMainThread) {
  const counters = {}
  for (let i = 0; i < THREADS; i++) {
    new Worker(fileURLToPath(import.meta.url)).on(
      'message',
      ({ counter, latency, threadId }) => {
        counters[threadId] = {
          counter,
          latency,
        }
      }
    )
  }
  let rps = 0
  let lastTotal = 0
  setInterval(() => {
    const entries = Object.values(counters)
    if (!entries.length) return
    const total = entries.reduce((a, b) => a + b.counter, 0)
    rps = rps ? (rps + (total - lastTotal)) / 2 : total
    lastTotal = total
    const latency = entries.reduce((a, b) => a + b.latency, 0) / entries.length
    process.stdout.write(
      `\r\r\r\rRequests: ${total}; Avg. RPS: ${Math.floor(
        rps
      )}; Avg. latency: ${Math.ceil(latency)}ms`
    )
  }, 1000)
} else {
  console.log('Connecting clients')
  const pool = new Pool({ timeout: 0 })
  for (let i = 0; i < CONCURRENCY; i++) {
    pool.add(new Client({ host: '127.0.0.1:42069' }))
  }
  await Promise.all(pool.items.map((c) => c.connect()))

  let counter = 0
  let latency = 0
  setInterval(() => {
    parentPort.postMessage({ counter, threadId, latency })
  }, 1000)

  while (true) {
    const client = await pool.capture()
    const start = performance.now()
    client.rpc(PROCEDURE, DATA, { useHttp: USE_HTTP }).then(() => {
      counter++
      latency = (latency + performance.now() - start) / 2
      pool.release(client)
    })
  }
}
