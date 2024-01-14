import { PrismaClient } from '@prisma/client'
import app from 'application/application.ts'

export const prismaProvider = app
  .provider()
  .withFactory(async () => {
    const prisma = new PrismaClient()
    await prisma.$connect()
    return prisma
  })
  .withDisposal((prisma) => prisma.$disconnect())
