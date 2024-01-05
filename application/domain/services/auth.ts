import app from '#app'
import { Prisma, User } from '@prisma/client'
import { cryptoProvider } from '../crypto.ts'
import prisma from '../prisma.ts'

export default app
  .provider()
  .withDependencies({ prisma, crypto: cryptoProvider })
  .withFactory(async ({ injections: { prisma, crypto } }) => {
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
