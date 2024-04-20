import { publicProcedure } from '#common/procedure.ts'
import {
  EVENT_MANAGER_PROVIDER,
  EXECUTE_PROVIDER,
} from '@neematajs/application'

export const chatExampleProcedure = publicProcedure.withDependencies({
  eventManager: EVENT_MANAGER_PROVIDER,
  execute: EXECUTE_PROVIDER,
})
