import {
  adminUserProvider,
  authenticatedUserProvider,
} from '#common/providers/users.ts'
import { CONNECTION_PROVIDER, Procedure } from '@neematajs/application'
import { WebsocketsTransport } from '@neematajs/transport-websockets'
import { loggingMiddleware } from 'application/common/providers/middlewares.ts'
import { prismaProvider } from 'application/common/providers/prisma.ts'

const globalDeps = {
  db: prismaProvider,
} as const

export const defaultProcedure = new Procedure()
  .withDependencies(globalDeps)
  .withMiddlewares(loggingMiddleware)
  .withTransport(WebsocketsTransport)

export const publicProcedure = defaultProcedure.withDependencies({
  connection: CONNECTION_PROVIDER,
})

export const userProcedure = publicProcedure.withDependencies({
  user: authenticatedUserProvider,
})

export const adminProcedure = userProcedure.withDependencies({
  user: adminUserProvider,
})
