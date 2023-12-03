import {
  createTypedDeclareProcedure,
  createTypedDeclareProvider,
} from '@neemata/application'

export const declareProvider =
  createTypedDeclareProvider<typeof import('./application.ts').default>()

export const declareProcedure =
  createTypedDeclareProcedure<typeof import('./application.ts').default>()
