import {
  Application,
  ApplicationOptions,
  ModuleLoader,
  PlainLoader,
  WorkerThreadsSubscriptionManager,
  createConsoleDestination,
  injectWorkerOptions,
} from '@neemata/application'
import { SchemaExtension, StaticApiAnnotations } from '@neemata/extensions'
import { ZodParser } from '@neemata/parser-zod'
import { WebsocketsTransport } from '@neemata/transport-websockets'
import { fileURLToPath } from 'node:url'

const { workerOptions, type, tasksRunner } = injectWorkerOptions()
const [port] = workerOptions ?? []
const transport = new WebsocketsTransport({
  hostname: '0.0.0.0',
  maxPayloadLength: 1024 * 1024 * 11,
  maxStreamChunkLength: 1024 * 1024 * 10,
  port,
})
const subManager = new WorkerThreadsSubscriptionManager()
const schemas = new SchemaExtension()
const typings = new StaticApiAnnotations({
  outputPath: fileURLToPath(new URL('../types/api.d.ts', import.meta.url)),
  emit: true,
})
const options: ApplicationOptions = {
  type,
  logging: {
    destinations: [createConsoleDestination('trace')],
  },
  loaders: [
    new PlainLoader({
      tasks: fileURLToPath(new URL('./common/tasks', import.meta.url)),
    }),
    new ModuleLoader({
      root: fileURLToPath(new URL('./modules', import.meta.url)),
    }),
  ],
  events: {
    timeout: 15000,
  },
  procedures: {
    parsers: new ZodParser(),
    timeout: 15000,
  },
  tasks: {
    timeout: 15000,
    runner: tasksRunner,
  },
}

export const app = new Application(options)
  .withTransport(transport, 'websockets')
  .withSubscriptionManager(subManager)
  .withExtension(schemas, 'schemas')
  .withExtension(typings, 'typings')
  .withConnection<undefined | { scope: string; id: number }>()

export default app
