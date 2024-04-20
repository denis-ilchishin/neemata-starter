import { Provider } from '@neematajs/application'
import { PrismaClient } from '@prisma/client'

export const prismaProvider = new Provider()
  .withFactory(async () => {
    const prisma = new PrismaClient()
    await prisma.$connect()
    return prisma
  })
  .withDisposal((prisma) => prisma.$disconnect())
