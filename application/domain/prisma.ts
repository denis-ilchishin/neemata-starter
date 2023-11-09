import { PrismaClient } from '@prisma/client'
import application from '../application.ts'

export default application.container.declareProvider({
  factory: async () => {
    const prisma = new PrismaClient()
    await prisma.$connect()
    return prisma
  },
  dispose: async (ctx, prisma) => {
    await prisma.$disconnect()
  },
})
