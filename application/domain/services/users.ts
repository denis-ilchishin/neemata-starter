import app from '#app'
import { prismaProvider } from '#domain/prisma.ts'

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
