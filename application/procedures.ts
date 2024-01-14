import {
  adminUserProvider,
  authenticatedUserProvider,
} from '#common/providers/users.ts'
import app from 'application/application.ts'
import { loggingMiddleware } from 'application/common/providers/middlewares.ts'
import { prismaProvider } from 'application/common/providers/prisma.ts'

const globalDeps = {
  db: prismaProvider,
}

export const defaultProcedure = app
  .procedure()
  .withMiddlewares(loggingMiddleware)

export const publicProcedure = defaultProcedure.withDependencies(globalDeps)

export const userProcedure = publicProcedure.withDependencies({
  user: authenticatedUserProvider,
})

export const adminProcedure = userProcedure.withDependencies({
  user: adminUserProvider,
})
