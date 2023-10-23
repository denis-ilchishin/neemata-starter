import { defineProcedure } from '@neemata/server'
import authContext from '../contexts/auth.ts'
import guardsProvider from '../domain/guards.ts'

const asyncOperation = () => new Promise((resolve) => setTimeout(resolve, 10))

// put some load on event loop with bunch of async operations
export default defineProcedure(
  {
    timeout: 0,
    httpMethod: ['get', 'post'],
    guards: async () => {
      await asyncOperation()
      return [() => true]
    },
    input: async (ctx, data) => {
      await asyncOperation()
      return data
    },
    handle: async (ctx, data) => {
      await asyncOperation()
      return data
    },
    output: async (ctx, data) => {
      await asyncOperation()
      return data
    },
  },
  { guards: guardsProvider, auth: authContext }
)
