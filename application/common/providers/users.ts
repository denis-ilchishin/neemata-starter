import app from '#app'
import { ApiError, ErrorCode, Scope } from '@neemata/application'
import { prismaProvider } from './prisma.ts'

export const usersService = app
  .provider()
  .withDependencies({ prisma: prismaProvider })
  .withFactory(({ prisma }) => {
    const getUserById = async (id: number) => {
      return await prisma.user.findUnique({
        where: { id },
      })
    }

    return { getUserById }
  })

export const userProvider = app
  .provider()
  .withDependencies({ usersService })
  .withScope(Scope.Call)
  .withFactory(async ({ context: { connection }, usersService }) => {
    if (!connection.data) return null
    const { id } = connection.data
    const user = await usersService.getUserById(id)
    if (!user) return null
    return user
  })

export const authenticatedUserProvider = app
  .provider()
  .withDependencies({ user: userProvider })
  .withFactory(async ({ user }) => {
    if (!user) throw new ApiError(ErrorCode.Forbidden)
    return user
  })

export const adminUserProvider = app
  .provider()
  .withDependencies({ user: authenticatedUserProvider })
  .withFactory(async ({ user }) => {
    if (user.type !== 'ADMIN') throw new ApiError(ErrorCode.Forbidden)
    return user
  })
