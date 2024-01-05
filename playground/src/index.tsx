import type { Events, Procedures } from '../../types/api.d.ts'
import './styles.css'

import { WebsocketsClient } from '@neemata/client-websockets'
import { createApp, defineComponent, reactive, ref } from 'vue'

const textDecoder = new TextDecoder()

const App = defineComponent({
  setup() {
    const port = +(import.meta as any).env.VITE_API_PORT || 42069
    const hostname = (import.meta as any).env.VITE_API_HOST || '127.0.0.1'

    const client = new WebsocketsClient<Procedures, Events>({
      host: hostname + ':' + port,
      debug: true,
    })

    client.connect()

    /**
     * @type {import('vue').Ref<undefined | Awaited<ReturnType<typeof client['createStream']>>>}
     */
    const streamRef = ref()
    const isStarted = ref(false)
    const isPaused = ref(true)
    const total = ref()
    const done = ref()
    const percent = ref()
    const isFinished = ref(false)
    const messageText = ref('')
    const joined = ref(false)
    const jsonStream = reactive<any>({
      payload: undefined,
      chunks: [],
    })
    const binaryStream = reactive<any>({
      payload: undefined,
      chunks: [],
    })

    const toMB = (bytes) => (bytes / 1000 ** 2).toFixed(2) + 'MB'

    const send = async () => {
      if (streamRef.value) {
        const stream = streamRef.value
        stream.on('pause', () => (isPaused.value = true))
        stream.on('resume', () => (isPaused.value = false))
        stream.on('progress', (sent) => {
          done.value = toMB(sent)
          percent.value = ((sent / stream.metadata.size) * 100).toFixed(2) + '%'
        })
        stream.once('end', () => {
          done.value = toMB(stream.metadata.size)
          percent.value = '100%'
        })
        const data = { file: stream }
        client.once('finished', () => (isFinished.value = true))
        await client.rpc('v1/upload', data)
      }
    }

    const createStream = async (event) => {
      isStarted.value = false
      isPaused.value = true
      isFinished.value = false
      streamRef.value = await client.createStream(event.target.files[0])
      streamRef.value.once('start', () => (isStarted.value = true))
      total.value = toMB(streamRef.value.metadata.size)
      done.value = toMB(0)
    }

    const simpleRpc = async () => {
      const res = await client.rpc('v1/simple')
      alert(res)
    }

    const complexRpc = async () => {
      const res = await client.rpc('v1/complex')
      alert(res)
    }

    const taskRpc = async () => {
      const res = await client.rpc('v1/task')
      alert(res)
    }

    const streamJsonRpc = async () => {
      jsonStream.payload = undefined
      jsonStream.chunks = []
      const { payload, stream } = await client.rpc('v1/stream-json')
      jsonStream.payload = payload
      try {
        for await (const chunk of stream) {
          jsonStream.chunks.push(chunk)
        }
      } catch (error) {
        console.error(error)
      }
    }

    const streamBinaryRpc = async () => {
      binaryStream.payload = undefined
      binaryStream.chunks = []
      const { payload, stream } = await client.rpc('v1/stream-binary')
      binaryStream.payload = payload
      try {
        for await (const chunk of stream) {
          binaryStream.chunks.push(textDecoder.decode(chunk))
        }
      } catch (error) {
        console.error(error)
      }
    }

    return {
      createStream,
      send,
      stream: streamRef,
      isStarted,
      isPaused,
      isFinished,
      total,
      done,
      percent,
      simpleRpc,
      taskRpc,
      streamJsonRpc,
      streamBinaryRpc,
      messageText,
      joined,
      jsonStream,
      binaryStream,
    }
  },
  render() {
    return (
      <div class="grid grid-cols-2 gap-8">
        <div class="bg-slate-700 p-2">
          <div class="flex flex-wrap gap-4 items-center">
            <input
              class="file-input"
              type="file"
              multiple
              onChange={this.createStream}
            >
              Select files
            </input>
            <button class="btn" onClick={this.send} disabled={!this.stream}>
              Send
            </button>
          </div>

          {this.isStarted && (
            <>
              <button
                class="btn"
                disabled={this.isPaused}
                onClick={() => this.stream?.pause()}
              >
                Pause
              </button>
              <button
                class="btn"
                disabled={!this.isPaused}
                onClick={() => this.stream?.resume()}
              >
                Resume
              </button>

              <div>
                <div>Progress: {this.percent}</div>
                <div>Total: {this.total}</div>
                <div>Done: {this.done}</div>
                {this.isFinished && <div>Yay! It's finished</div>}
              </div>
            </>
          )}
        </div>

        <div class=" bg-slate-700 p-2 flex flex-wrap gap-4">
          <button class="btn" onClick={this.simpleRpc}>
            Make simple RPC call
          </button>
          <button class="btn" onClick={this.complexRpc}>
            Make complex RPC call
          </button>
          <button class="btn" onClick={this.taskRpc}>
            Make task RPC call
          </button>
        </div>
        <div class="bg-slate-700 p-2">
          <button class="btn" onClick={this.streamJsonRpc}>
            Make JSON stream RPC call
          </button>
          <div class="flex flex-col gap-4 mt-4">
            <div>
              Payload:
              <div class="mockup-code">
                {!!this.jsonStream.payload && (
                  <pre>
                    <code>{JSON.stringify(this.jsonStream.payload)}</code>
                  </pre>
                )}
              </div>
            </div>
            <div>
              Chunks:
              <div class="mockup-code">
                {this.jsonStream.chunks.map((chunk, i) => (
                  <pre data-prefix={i + 1}>
                    <code>{JSON.stringify(chunk)}</code>
                  </pre>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div class="bg-slate-700 p-2">
          <button class="btn" onClick={this.streamBinaryRpc}>
            Make binary stream RPC call
          </button>
          <div class="flex flex-col gap-4 mt-4">
            <div>
              Payload:
              <div class="mockup-code">
                {!!this.binaryStream.payload && (
                  <pre>
                    <code>{JSON.stringify(this.binaryStream.payload)}</code>
                  </pre>
                )}
              </div>
            </div>
            <div>
              Chunks:
              <div class="mockup-code">
                {this.binaryStream.chunks.map((chunk, i) => (
                  <pre data-prefix={i + 1}>
                    <code>{chunk}</code>
                  </pre>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

export const app = createApp(App)

app.mount(document.querySelector('#app')!)
