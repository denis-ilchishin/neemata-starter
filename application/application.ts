import {
  Application,
  ApplicationOptions,
  createConsoleDestination,
  injectWorkerOptions,
} from '@neemata/application'
import { SchemaExtension, StaticApiAnnotations } from '@neemata/extensions'
import { ZodParser } from '@neemata/parser-zod'
import { WebsocketsTransport } from '@neemata/transport-websockets'
import { fileURLToPath } from 'url'
import { events } from './events.ts'

const { workerOptions: port, type, tasksRunner } = injectWorkerOptions()

const transport = new WebsocketsTransport({
  hostname: '0.0.0.0',
  port,
  maxPayloadLength: 1024 * 1024 * 11,
  maxStreamChunkLength: 1024 * 1024 * 10,
  http: true,
})
const schemas = new SchemaExtension()
const typings = new StaticApiAnnotations({
  applicationPath: fileURLToPath(import.meta.url),
  output: fileURLToPath(new URL('../types/api.d.ts', import.meta.url)),
  emit: true,
})
const options: ApplicationOptions = {
  type,
  logging: {
    destinations: [createConsoleDestination('debug')],
  },
  api: {
    parsers: new ZodParser(),
    path: fileURLToPath(new URL('./api', import.meta.url)),
  },
  tasks: {
    path: fileURLToPath(new URL('./tasks', import.meta.url)),
    runner: tasksRunner,
  },
}

export const app = new Application(options, transport, {
  schemas,
  typings,
})
  .withClientData<{ token: string }>()
  .withEvents(events)

export default app
