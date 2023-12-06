import { Client } from '@neemata/client-uws'
import { createApp, defineComponent, ref } from 'vue'
import './styles.css'

const App = defineComponent({
  setup() {
    const port = +import.meta.env.VITE_API_PORT || 42069
    const hostname = import.meta.env.VITE_API_HOST || '127.0.0.1'

    /**@type {Client<import('../api.d.ts').Api>} */
    const client = new Client({
      host: hostname + ':' + port,
      debug: true,
    })

    client.connect()

    /**
     * @type {import('vue').Ref<import('@neemata/client-uws').Stream | undefined>}
     */
    const stream = ref()
    const isStarted = ref(false)
    const isPaused = ref(true)
    const total = ref()
    const done = ref()
    const percent = ref()
    /**
     * @type {import('vue').Ref<string[]>}
     */
    const messages = ref([])
    const isFinished = ref(false)
    const messageText = ref('')
    const joined = ref(false)

    const toMB = (bytes) => (bytes / 1000 ** 2).toFixed(2) + 'MB'

    const send = async () => {
      if (stream.value) {
        const _stream = stream.value
        _stream.on('pause', () => (isPaused.value = true))
        _stream.on('resume', () => (isPaused.value = false))
        _stream.on('progress', (size, sent) => {
          done.value = toMB(sent)
          percent.value = ((sent / size) * 100).toFixed(2) + '%'
        })
        _stream.once('end', () => {
          done.value = toMB(_stream.meta.size)
          percent.value = '100%'
        })
        const data = { file: _stream }
        client.once('finished', () => (isFinished.value = true))
        await client.rpc('v1/upload', data)
      }
    }

    const createStream = (event) => {
      isStarted.value = false
      isPaused.value = true
      isFinished.value = false
      stream.value = client.createStream(event.target.files[0])
      stream.value.once('start', () => (isStarted.value = true))
      total.value = toMB(stream.value.meta.size)
      done.value = toMB(0)
    }

    const event = 'message'

    const onMessage = (message) => {
      messages.value.push(message)
    }

    const join = async () => {
      client.off(event, onMessage)
      client.on(event, onMessage)
      await client.rpc('v1/room/join', { roomId: 'chat' })
      joined.value = true
    }

    const leave = async () => {
      await client.rpc('v1/room/leave', { roomId: 'chat' })
      client.off(event, onMessage)
      joined.value = false
      messages.value = []
    }

    const sendMessage = async () => {
      const message = messageText.value
      messageText.value = ''
      await client.rpc('v1/room/message', {
        roomId: 'chat',
        message,
      })
    }

    const httpRpc = async () => {
      const res = await client.rpc('v1/http-only', undefined, { useHttp: true })
      alert(res)
    }

    const taskRpc = async () => {
      const res = await client.rpc('v1/task', undefined, { useHttp: true })
      alert(res)
    }

    return {
      createStream,
      send,
      stream,
      isStarted,
      isPaused,
      isFinished,
      total,
      done,
      percent,
      messages,
      join,
      leave,
      httpRpc,
      taskRpc,
      sendMessage,
      messageText,
      joined,
    }
  },
  render() {
    return (
      <div class="grid grid-cols-2 xl:grid-cols-4 gap-8">
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
        <div class="bg-slate-700 p-2">
          <div class="flex justify-around border-b border-slate-800 pb-2">
            <button class="btn" onClick={this.join} disabled={this.joined}>
              Join
            </button>
            <button class="btn" onClick={this.leave} disabled={!this.joined}>
              Leave
            </button>
          </div>
          {this.joined && (
            <div>
              {this.messages.map((message) => (
                <div class="chat chat-start">
                  <div class="chat-bubble">{message}</div>
                </div>
              ))}
              <div class="flex gap-2 pt-4">
                <input
                  placeholder="Type your message"
                  class="input w-full"
                  type="text"
                  v-model={this.messageText}
                ></input>
                <button
                  class="btn"
                  onClick={this.sendMessage}
                  disabled={!this.messageText}
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
        <div class="bg-slate-700 p-2">
          <button class="btn" onClick={this.httpRpc}>
            Make RPC via Http transport
          </button>
        </div>
        <div class="bg-slate-700 p-2">
          <button class="btn" onClick={this.taskRpc}>
            Make RPC with task execution
          </button>
        </div>
      </div>
    )
  },
})

export const app = createApp(App)

app.mount(document.querySelector('#app'))
