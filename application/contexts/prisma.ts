import { defineContext } from '@neemata/server'
import { PrismaClient } from '@prisma/client'

export default defineContext({
  factory: async () => {
    const prisma = new PrismaClient()
    await prisma.$connect()
    return prisma
  },
  dispose: async (ctx, prisma) => {
    await prisma.$disconnect()
  },
})
