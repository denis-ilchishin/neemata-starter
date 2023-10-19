import { defineProvider } from '@neemata/server'
import { Prisma, User } from '@prisma/client'
import prismaContext from '../contexts/prisma.js'
import cryptoProvider from '../lib/crypto.js'

export default defineProvider(
  async ({ injections: { prisma, cryptoService } }) => {
    async function findUserByEmail(email: string) {
      return await prisma.user.findFirst({
        where: { email },
      })
    }

    async function findUserByToken(token: string) {
      return await prisma.user.findFirst({
        where: { UserToken: { some: { token: cryptoService.hash(token) } } },
      })
    }

    async function deleteUserToken(token: string) {
      return await prisma.userToken.delete({
        where: { token: cryptoService.hash(token) },
      })
    }

    async function createUser(data: Prisma.UserCreateInput) {
      data.password = cryptoService.hash(data.password)
      return await prisma.user.create({ data })
    }

    async function createUserToken(userId: User['id']) {
      const token = cryptoService.generateToken()
      const userToken = await prisma.userToken.create({
        data: {
          token: cryptoService.hash(token),
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
  },
  { prisma: prismaContext, cryptoService: cryptoProvider }
)
