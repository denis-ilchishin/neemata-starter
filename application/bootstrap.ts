import app from '#app'
import { clientProvider } from '#domain/auth.ts'
import { ApiError, ErrorCode } from '@neemata/application'
import { ZodError } from 'zod'

app.registerFilter(
  ZodError,
  (error) =>
    new ApiError(ErrorCode.ValidationError, 'Validation error', error.issues)
)

app.registerClientProvider(clientProvider)

export default app
