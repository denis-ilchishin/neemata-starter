import app from '#app'
import { loggingMiddleware } from '#domain/middlewares.ts'
import { prismaProvider } from '#domain/prisma.ts'
import {
  adminUserProvider,
  authenticatedUserProvider,
} from '#domain/services/auth.ts'

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
