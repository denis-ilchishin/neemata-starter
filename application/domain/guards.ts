import { declareProvider } from '../helpers.ts'

export const guardProvider = declareProvider(() => [() => true])
