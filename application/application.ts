import { Adapter } from '@neemata/adapter-uws'
import { ApiError, Application, ErrorCode } from '@neemata/application'
import {
  GuardsExtension,
  QueuesExtension,
  SchemaExtension,
  TimeoutExtension,
} from '@neemata/extensions'
import { ZodParser } from '@neemata/parser-zod'
import { fileURLToPath } from 'node:url'
import { ZodError } from 'zod'
import { guardProvider } from './domain/guards.ts'
import tasks from './tasks.ts'

const adapter = new Adapter({
  hostname: '0.0.0.0',
  port: +process.env.PORT! || 42069,
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

application.registerFilter(
  ZodError,
  (error) =>
    new ApiError(ErrorCode.ValidationError, 'Validation error', error.issues)
)

guards.registerGuard('*', guardProvider)

export default application
