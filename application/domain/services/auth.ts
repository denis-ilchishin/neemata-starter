import app from '#app'
import { ApiError, ErrorCode, Scope } from '@neemata/application'
import { Prisma, User } from '@prisma/client'
import { cryptoProvider } from '../crypto.ts'
import { prismaProvider } from '../prisma.ts'
import { usersService } from './users.ts'

export const authService = app
  .provider()
  .withDependencies({ prisma: prismaProvider, crypto: cryptoProvider })
  .withFactory(async ({ prisma, crypto }) => {
    async function findUserByEmail(email: string) {
      return await prisma.user.findFirst({
        where: { email },
      })
    }

    async function findUserByToken(token: string) {
      return await prisma.user.findFirst({
        where: { UserToken: { some: { token: crypto.hash(token) } } },
      })
    }

    async function deleteUserToken(token: string) {
      return await prisma.userToken.delete({
        where: { token: crypto.hash(token) },
      })
    }

    async function createUser(data: Prisma.UserCreateInput) {
      data.password = crypto.hash(data.password)
      return await prisma.user.create({ data })
    }

    async function createUserToken(userId: User['id']) {
      const token = crypto.generateToken()
      const userToken = await prisma.userToken.create({
        data: {
          token: crypto.hash(token),
          userId,
        },
      })
      return { token, userToken }
    }

    return {
      findUserByEmail,
      findUserByToken,
      createUser,
      createUserToken,
      deleteUserToken,
      cookieName: 'token',
    }
  })

export const userProvider = app
  .provider()
  .withDependencies({ usersService })
  .withScope(Scope.Call)
  .withFactory(async ({ app: { connection }, usersService }) => {
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
