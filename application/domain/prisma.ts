import { PrismaClient } from '@prisma/client'
import { declareProvider } from '../helpers.ts'

export default declareProvider({
  factory: async () => {
    const prisma = new PrismaClient()
    await prisma.$connect()
    return prisma
  },
  dispose: async (ctx, prisma) => {
    await prisma.$disconnect()
  },
})
