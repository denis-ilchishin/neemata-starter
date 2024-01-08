import app from '#app'
import { cryptoProvider } from '#domain/crypto.ts'
import { prismaProvider } from '#domain/prisma.ts'

export default app
  .task()
  .withDependencies({
    db: prismaProvider,
    crypto: cryptoProvider,
  })
  .withHandler(async ({ app, db, crypto }) => {
    const user = await db.user.create({
      data: {
        email: 'someEmail',
        password: crypto.hash('somePassword'),
        type: 'ADMIN',
      },
    })
    app.logger.info(`Created [${user.type}] user with [${user.email}] email`)
  })
