<script setup lang="ts">
import type { Client } from '#app';
import './styles.css';

import { WebsocketsClient, type UpStream } from '@neematajs/client-websockets';
import { onBeforeUnmount, reactive, ref } from 'vue';


const textDecoder = new TextDecoder()

const port = +(import.meta as any).env.VITE_API_PORT || 42069
const hostname = (import.meta as any).env.VITE_API_HOST || '127.0.0.1'

const client = new WebsocketsClient<Client['procedures'], Client['events']>({
  host: hostname + ':' + port,
  debug: true,
})

client.connect()

onBeforeUnmount(() => client.disconnect())

const fileInputRef = ref<HTMLInputElement>()
const streamRef = ref<UpStream>()
const isStarted = ref(false)
const isPaused = ref(true)
const total = ref()
const done = ref()
const percent = ref()
const isFinished = ref<string>()
const messageText = ref('')
const messages = ref<string[]>([])
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

const upload = async () => {
  if (streamRef.value) {
    const stream = streamRef.value
    isStarted.value = false
    stream.on('start', () => (isPaused.value = false))
    stream.on('pause', () => (isPaused.value = true))
    stream.on('resume', () => (isPaused.value = false))
    stream.on('progress', (sent) => {
      done.value = toMB(sent)
      percent.value = ((sent / stream.metadata.size) * 100).toFixed(2) + '%'
    })
    stream.once('end', () => {
      console.log('end')
      done.value = toMB(stream.metadata.size)
      percent.value = '100%'
      streamRef.value = undefined
      fileInputRef.value = undefined
    })
    const data = { file: stream }
    client.once('example/finish', (data) => {
      isFinished.value = data
    })
    await client.rpc('example/upload', data)
  }
}

const createStream = async (event) => {
  isStarted.value = false
  isPaused.value = true
  isFinished.value = undefined
  streamRef.value = await client.createStream(event.target.files[0])
  streamRef.value.once('start', () => (isStarted.value = true))
  total.value = toMB(streamRef.value.metadata.size)
  done.value = toMB(0)
}

const simpleRpc = async () => {
  const res = await client.rpc('example/simple').catch((err) => err.message)
  alert(res)
}

const complexRpc = async () => {
  const res = await client
    .rpc('example/complex', {
      input1: 'input1',
      input2: 'input1',
    })
    .then(JSON.stringify)
    .catch((err) => err.message)
  alert(res)
}

const taskRpc = async () => {
  const res = await client.rpc('example/task').catch((err) => err.message)
  alert(res)
}

const streamJsonRpc = async () => {
  jsonStream.payload = undefined
  jsonStream.chunks = []
  const { payload, stream } = await client.rpc('example/streamJson')
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
  const { payload, stream } = await client.rpc('example/streamBinary')
  binaryStream.payload = payload
  try {
    for await (const chunk of stream) {
      binaryStream.chunks.push(textDecoder.decode(chunk))
    }
  } catch (error) {
    console.error(error)
  }
}

const join = async () => {
  const sub = await client.rpc('chatExample/join', { chatId: 1 })
  sub.on('data', ({ message }) => {
    messages.value.push(message)
  })
  sub.once('end', () => {
    joined.value = false
  })
  joined.value = true
}

const leave = async () => {
  await client.rpc('chatExample/leave', { chatId: 1 })
}

const send = async () => {
  await client.rpc('chatExample/message', {
    chatId: 1,
    message: messageText.value,
  })
  messageText.value = ''
}
</script>

<template>
  <div class="grid grid-cols-2 gap-8">
    <div class="bg-slate-700 p-2">
      <div class="flex flex-wrap gap-4 items-center">
        <input
          class="file-input"
          type="file"
          multiple
          @change="createStream"
          ref="fileInputRef"
        />
        <button class="btn" @click="upload" :disabled="!streamRef">Send</button>
      </div>
      <template v-if="isStarted">
        <button
          v-if="isStarted && !isFinished"
          class="btn"
          :disabled="isPaused"
          @click="() => streamRef?.pause()"
        >
          Pause
        </button>
        <button
          v-if="isStarted && !isFinished"
          class="btn"
          :disabled="!isPaused"
          @click="() => streamRef?.resume()"
        >
          Resume
        </button>

        <div>
          <div>Progress: {{ percent }}</div>
          <div>Total: {{ total }}</div>
          <div>Done: {{ done }}</div>
          <div v-if="isFinished">{{ isFinished }}</div>
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
            <pre v-if="jsonStream.payload">{{
              JSON.stringify(jsonStream.payload)
            }}</pre>
          </div>
        </div>
        <div>
          Chunks:
          <div class="mockup-code">
            <pre v-for="(chunk, i) in jsonStream.chunks" :data-prefix="i">{{
              JSON.stringify(chunk)
            }}</pre>
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
            <pre v-if="binaryStream.payload">{{
              JSON.stringify(binaryStream.payload)
            }}</pre>
          </div>
        </div>
        <div>
          Chunks:
          <div class="mockup-code">
            <pre
              v-for="(chunk, i) in binaryStream.chunks"
              :data-prefix="i + 1"
            ><code>{{ chunk }}</code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-2 min-h-96">
      <div
        class="h-full mx-auto max-w-screen-sm bg-slate-700 p-2 flex flex-col"
      >
        <div class="flex justify-around">
          <button class="btn" :disabled="joined" @click="join">
            Join chat
          </button>
          <button class="btn" :disabled="!joined" @click="leave">
            Leave chat
          </button>
        </div>
        <div class="flex-1">
          <div v-for="(message, i) in messages" class="chat chat-start">
            <div class="chat-bubble">
              {{ message }}
            </div>
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <input type="text" class="input w-full" v-model="messageText" />
          <button class="btn" @click="send">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>
