import app from '#app'
import { cryptoProvider } from '#domain/crypto.ts'
import prismaProvider from '#domain/prisma.ts'

export default app
  .task()
  .withDependencies({
    db: prismaProvider,
    crypto: cryptoProvider,
  })
  .withHandler(async ({ logger, injections }) => {
    const { db, crypto } = injections
    const user = await db.user.create({
      data: {
        email: 'someEmail',
        password: crypto.hash('somePassword'),
        type: 'ADMIN',
      },
    })
    logger.info(`Created [${user.type}] user with [${user.email}] email`)
  })
