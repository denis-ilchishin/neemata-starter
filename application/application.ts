import { Adapter } from '@neemata/adapter-uws'
import {
  ApiError,
  Application,
  ErrorCode,
  WorkerType,
  createApp,
} from '@neemata/application'
import {
  GuardsExtension,
  QueuesExtension,
  SchemaExtension,
  TimeoutExtension,
} from '@neemata/extensions'
import { ZodParser } from '@neemata/parser-zod'
import { ZodError } from 'zod'
import { guardProvider } from './domain/guards.ts'

export default createApp(({ id, type, applicationOptions, workerOptions }) => {
  const adapter = new Adapter({
    hostname: '0.0.0.0',
    port: workerOptions,
    maxPayloadLength: 1024 * 1024 * 11,
    maxStreamChunkLength: 1024 * 1024 * 10,
  })
  const queues = new QueuesExtension({
    queues: [['*', { concurrency: 1, size: 50, timeout: 100 }]],
  })
  const timeout = new TimeoutExtension(10000)
  const schemas = new SchemaExtension({
    export:
      id === 0 && type === WorkerType.Api
        ? { typescript: ['./playground/api.d.ts'] }
        : undefined,
  })
  const guards = new GuardsExtension()

  applicationOptions.api = {
    ...(applicationOptions.api ?? {}),
    parser: new ZodParser(),
  }

  const application = new Application(adapter, applicationOptions, {
    queues,
    guards,
    schemas,
    timeout,
  })

  application.registerFilter(
    ZodError,
    (error) =>
      new ApiError(ErrorCode.ValidationError, 'Validation error', error.issues)
  )

  guards.registerGuard('*', guardProvider)

  return application
})
