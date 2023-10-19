import { ErrorCode } from '@neemata/client'
import { ApiError, defineApplication } from '@neemata/server'
import { ZodError } from 'zod'

export default defineApplication({
  errorHandlers: [
    [
      ZodError,
      (err: ZodError) =>
        new ApiError(
          ErrorCode.ValidationError,
          'Input validation error',
          err.issues
        ),
    ],
  ],
})
