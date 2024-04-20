import {
  ApiError,
  CONNECTION_PROVIDER,
  ErrorCode,
  Provider,
  Scope,
} from '@neematajs/application'
import { prismaProvider } from './prisma.ts'

export const usersService = new Provider()
  .withDependencies({ prisma: prismaProvider })
  .withFactory(({ prisma }) => {
    const getUserById = async (id: number) => {
      return await prisma.user.findUnique({
        where: { id },
      })
    }

    return { getUserById }
  })

export const userProvider = new Provider()
  .withDependencies({ usersService, connection: CONNECTION_PROVIDER })
  .withScope(Scope.Call)
  .withFactory(async ({ connection, usersService }) => {
    if (!connection.data) return null
    const { id } = connection.data
    const user = await usersService.getUserById(id)
    if (!user) return null
    return user
  })

export const authenticatedUserProvider = new Provider()
  .withDependencies({ user: userProvider })
  .withFactory(async ({ user }) => {
    if (!user) throw new ApiError(ErrorCode.Forbidden)
    return user
  })

export const adminUserProvider = new Provider()
  .withDependencies({ user: authenticatedUserProvider })
  .withFactory(async ({ user }) => {
    if (user.type !== 'ADMIN') throw new ApiError(ErrorCode.Forbidden)
    return user
  })
