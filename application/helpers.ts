import {
  createTypedDeclareProcedure,
  createTypedDeclareProvider,
  createTypedDeclareTask,
} from '@neemata/application'

type App = ReturnType<typeof import('./application.ts').default>

export const declareProvider = createTypedDeclareProvider<App>()
export const declareProcedure = createTypedDeclareProcedure<App>()
export const declareTask = createTypedDeclareTask<App>()
