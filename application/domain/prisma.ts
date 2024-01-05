import { app } from '#app'
import { PrismaClient } from '@prisma/client'

export default app
  .provider()
  .withFactory(async () => {
    const prisma = new PrismaClient()
    await prisma.$connect()
    return prisma
  })
  .withDisposal((prisma) => prisma.$disconnect())
