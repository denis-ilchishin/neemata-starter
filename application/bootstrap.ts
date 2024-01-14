import app from '#app'
import { connectionProvider } from '#common/providers/connection.ts'
import { ApiError, ErrorCode } from '@neemata/application'
import { ZodError } from 'zod'

app
  .registerFilter(
    ZodError,
    (error) =>
      new ApiError(ErrorCode.ValidationError, 'Validation error', error.issues)
  )
  .registerConnection(connectionProvider)

export default app
