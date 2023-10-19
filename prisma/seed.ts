import { app } from '@neemata/cli/application'
import authProvider from '../application/domain/auth.ts'

await app.container.load()
const auth = await app.resolve(authProvider)
await auth.createUser({
  email: 'admin@example.com',
  name: 'admin',
  password: 'admin',
  type: 'ADMIN',
})
await auth.createUser({
  email: 'user@example.com',
  name: 'user',
  password: 'user',
  type: 'USER',
})
