import app from 'application/application.ts'
import { cryptoProvider } from 'application/common/providers/crypto.ts'
import { prismaProvider } from 'application/common/providers/prisma.ts'

export default app
  .task()
  .withDependencies({
    db: prismaProvider,
    crypto: cryptoProvider,
  })
  .withHandler(async ({ context, db, crypto }) => {
    const user = await db.user.create({
      data: {
        email: 'someEmail',
        password: crypto.hash('somePassword'),
        type: 'ADMIN',
      },
    })
    context.logger.info(
      `Created [${user.type}] user with [${user.email}] email`
    )
  })
