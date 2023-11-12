import { Adapter } from '@neemata/adapter-uws'
import { Application } from '@neemata/application'
import {
  GuardsExtension,
  QueuesExtension,
  SchemaExtension,
  TimeoutExtension,
} from '@neemata/extensions'
import { ZodParser } from '@neemata/parser-zod'
import { fileURLToPath } from 'node:url'
import tasks from './tasks.ts'

const adapter = new Adapter({
  hostname: '0.0.0.0',
  port: 42069,
  maxPayloadLength: 1024 * 1024 * 11,
  maxStreamChunkLength: 1024 * 1024 * 10,
})
const queues = new QueuesExtension({
  queues: [['*', { concurrency: 1, size: 50, timeout: 100 }]],
})
const timeout = new TimeoutExtension(10000)
const schemas = new SchemaExtension({
  export: { typescript: ['./playground/api.d.ts'] },
})
const guards = new GuardsExtension()

export const application = new Application(
  adapter,
  {
    api: {
      parser: new ZodParser(),
      path: fileURLToPath(new URL('./api', import.meta.url)),
    },
    logging: { level: 'trace' },
  },
  {
    tasks,
    queues,
    guards,
    schemas,
    timeout,
  }
)

export default application
