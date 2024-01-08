<script setup lang="ts">
import type { Events, Procedures } from '../../types/api.d.ts'
import './styles.css'

import { WebsocketsClient } from '@neemata/client-websockets'
import { reactive, ref } from 'vue'

const textDecoder = new TextDecoder()

const httpPort = +(import.meta as any).env.VITE_API_PORT || 42069
const wsPort = +(import.meta as any).env.VITE_API_PORT || 42070
const hostname = (import.meta as any).env.VITE_API_HOST || '127.0.0.1'

// Swap the client to use HTTP instead of Websockets
// import { HttpClient } from '@neemata/client-http'
// const client = new HttpClient({
//   host: hostname + ':' + httpPort,
//   debug: true,
// })

const client = new WebsocketsClient<Procedures, Events>({
  host: hostname + ':' + wsPort,
  debug: true,
})

client.connect()

const streamRef = ref<Awaited<ReturnType<WebsocketsClient['createStream']>>>()
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
    stream.on('', () => (isPaused.value = false))
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
  const res = await client.rpc('v1/simple').catch((err) => err.message)
  alert(res)
}

const complexRpc = async () => {
  const res = await client
    .rpc('v1/complex', {
      input1: 'input1',
      input2: 'input1',
    })
    .then(JSON.stringify)
    .catch((err) => err.message)
  alert(res)
}

const taskRpc = async () => {
  const res = await client.rpc('v1/task').catch((err) => err.message)
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
</script>

<template>
  <div class="grid grid-cols-2 gap-8">
    <div class="bg-slate-700 p-2">
      <div class="flex flex-wrap gap-4 items-center">
        <input class="file-input" type="file" multiple @change="createStream" />
        <button class="btn" @click="send" :disabled="!streamRef">Send</button>
      </div>
      <template v-if="isStarted">
        <button
          class="btn"
          :disabled="isPaused || isFinished"
          @click="() => streamRef?.pause()"
        >
          Pause
        </button>
        <button
          class="btn"
          :disabled="!isPaused || isFinished"
          @click="() => streamRef?.resume()"
        >
          Resume
        </button>

        <div>
          <div>Progress: {{ percent }}</div>
          <div>Total: {{ total }}</div>
          <div>Done: {{ done }}</div>
          <div v-if="isFinished">Yay! It's finished</div>
        </div>
      </template>
    </div>

    <div class="bg-slate-700 p-2 flex flex-wrap gap-4">
      <button class="btn" @click="simpleRpc">Make simple RPC call</button>
      <button class="btn" @click="complexRpc">Make complex RPC call</button>
      <button class="btn" @click="taskRpc">Make task RPC call</button>
    </div>
    <div class="bg-slate-700 p-2">
      <button class="btn" @click="streamJsonRpc">
        Make JSON stream RPC call
      </button>
      <div class="flex flex-col gap-4 mt-4">
        <div>
          Payload:
          <div class="mockup-code">
            <pre v-if="jsonStream.payload">
                    <code>{{jsonStream.payload}}</code>
                  </pre>
          </div>
        </div>
        <div>
          Chunks:
          <div class="mockup-code">
            <pre v-for="(chunk, i) in jsonStream.chunks" :data-prefix="i + 1">
                    <code>{{ chunk }}</code>
                  </pre>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-slate-700 p-2">
      <button class="btn" @click="streamBinaryRpc">
        Make binary stream RPC call
      </button>
      <div class="flex flex-col gap-4 mt-4">
        <div>
          Payload:
          <div class="mockup-code">
            <pre v-if="binaryStream.payload">
                    <code>{{binaryStream.payload}}</code>
                  </pre>
          </div>
        </div>
        <div>
          Chunks:
          <div class="mockup-code">
            <pre v-for="(chunk, i) in binaryStream.chunks" :data-prefix="i + 1">
                    <code>{{ chunk }}</code>
                  </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
