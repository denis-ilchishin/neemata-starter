import { chatExampleModule } from '#modules/chat-example/module.ts'
import { exampleModule } from '#modules/example/module.ts'
import {
  ApiError,
  AppClient,
  Application,
  ApplicationOptions,
  BasicSubscriptionManager,
  ErrorCode,
  Provider,
  createConsoleDestination,
} from '@neematajs/application'
import { ZodParser } from '@neematajs/parser-zod'
import {
  WorkerThreadsSubscriptionManager,
  injectWorkerOptions,
} from '@neematajs/server'
import { WebsocketsTransport } from '@neematajs/transport-websockets'
import { ZodError } from 'zod'
import { coreModule } from './core/module.ts'

const {
  isServer,
  workerOptions,
  workerType: type,
  tasksRunner,
} = injectWorkerOptions()

const [port] = workerOptions ?? []

const options: ApplicationOptions = {
  type,
  logging: {
    destinations: [createConsoleDestination('trace')],
  },
  api: {
    parsers: new ZodParser(),
    timeout: 15000,
  },
  events: {
    timeout: 15000,
  },
  tasks: {
    timeout: 15000,
    runner: tasksRunner,
  },
}

export const app = new Application(options)
  .registerTransport(WebsocketsTransport, {
    hostname: '0.0.0.0',
    maxPayloadLength: 1024 * 1024 * 11,
    maxStreamChunkLength: 1024 * 1024 * 10,
    port,
  })
  .registerSubscriptionManager(
    isServer ? WorkerThreadsSubscriptionManager : BasicSubscriptionManager
  )
  .registerModules({
    core: coreModule,
    chatExample: chatExampleModule,
    example: exampleModule,
  })

app.registry.registerFilter(
  ZodError,
  new Provider().withValue(
    (error) =>
      new ApiError(ErrorCode.ValidationError, 'Validation error', error.issues)
  )
)

export type Client = AppClient<typeof app>

export default app
