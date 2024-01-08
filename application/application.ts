import {
  Application,
  ApplicationOptions,
  createConsoleDestination,
  injectWorkerOptions,
} from '@neemata/application'
import { SchemaExtension, StaticApiAnnotations } from '@neemata/extensions'
import { ZodParser } from '@neemata/parser-zod'
import { HttpTransport } from '@neemata/transport-http'
import { WebsocketsTransport } from '@neemata/transport-websockets'
import { fileURLToPath } from 'node:url'
import { events } from './events.ts'

const { workerOptions, type, tasksRunner } = injectWorkerOptions()
const [httpPort, wsPort] = workerOptions ?? []
const httpOptions = {
  hostname: '0.0.0.0',
  maxPayloadLength: 1024 * 1024 * 11,
  maxStreamChunkLength: 1024 * 1024 * 10,
}
const wsTransport = new WebsocketsTransport({
  ...httpOptions,
  port: wsPort,
})
const httpTransport = new HttpTransport({
  ...httpOptions,
  port: httpPort,
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
    destinations: [createConsoleDestination('info')],
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

export default new Application(options)
  .withTransport(wsTransport, 'websockets')
  .withTransport(httpTransport, 'http')
  .withExtension(schemas, 'schemas')
  .withExtension(typings, 'typings')
  .withConnection<undefined | { scope: string; id: number }>()
  .withEvents(events)
