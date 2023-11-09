import application from '../application/application.ts'
import authProvider from '../application/domain/services/auth.ts'
await application.container.load()
const auth = await application.container.resolve(authProvider)
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
