import authContext from '../contexts/auth.ts'
import prismaContext from '../contexts/prisma.ts'
import guards from './guards.ts'

export const dbDependecies = {
  prisma: prismaContext,
} as const

export const globalDependecies = {
  ...dbDependecies,
} as const

export const defaultProcedureDependencies = {
  ...globalDependecies,
  auth: authContext,
  guards: guards,
} as const
