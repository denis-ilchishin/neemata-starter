import { httpClientProvider } from '@domain/auth.ts'
import { guardProvider } from '@domain/guards.ts'
import {
  ApiError,
  Application,
  ApplicationOptions,
  ErrorCode,
  createConsoleDestination,
  declareApplication,
} from '@neemata/application'
import {
  GuardsExtension,
  QueuesExtension,
  SchemaExtension,
  StaticApiAnnotations,
  TimeoutExtension,
} from '@neemata/extensions'
import { WebsocketsTransport } from '@neemata/transport-websockets'
import { fileURLToPath } from 'url'
import { ZodError } from 'zod'

export default declareApplication(
  ({ id, type, tasksRunner, workerOptions: port }) => {
    const clientProvider = httpClientProvider as unknown as never // TODO: fix circular type reference
    const transport = new WebsocketsTransport<{ token: string }>({
      hostname: '0.0.0.0',
      port,
      maxPayloadLength: 1024 * 1024 * 11,
      maxStreamChunkLength: 1024 * 1024 * 10,
      clientProvider,
      http: true,
    })
    const queues = new QueuesExtension({
      queues: [['*', { concurrency: 1, size: 50, timeout: 100 }]],
    })
    const timeout = new TimeoutExtension(10000)
    const schemas = new SchemaExtension({})
    const typings = new StaticApiAnnotations({
      output: fileURLToPath(new URL('../types/api.d.ts', import.meta.url)),
      emit: true,
    })
    const guards = new GuardsExtension()
    const options: ApplicationOptions = {
      type,
      logging: {
        destinations: [createConsoleDestination('debug')],
      },
      api: {
        path: fileURLToPath(new URL('./api', import.meta.url)),
      },
      tasks: {
        path: fileURLToPath(new URL('./tasks', import.meta.url)),
        runner: tasksRunner,
      },
    }

    const application = new Application(transport, options, {
      queues,
      guards,
      schemas,
      timeout,
      typings,
    })

    application.registerFilter(
      ZodError,
      (error) =>
        new ApiError(
          ErrorCode.ValidationError,
          'Validation error',
          error.issues
        )
    )

    guards.registerGuard('*', guardProvider)

    return application
  }
)
