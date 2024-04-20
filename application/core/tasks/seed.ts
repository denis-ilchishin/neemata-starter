import { LOGGER_PROVIDER, Task } from '@neematajs/application'
import { cryptoProvider } from 'application/common/providers/crypto.ts'
import { prismaProvider } from 'application/common/providers/prisma.ts'

export default new Task()
  .withDependencies({
    db: prismaProvider,
    crypto: cryptoProvider,
    logger: LOGGER_PROVIDER,
  })
  .withHandler(async ({ logger, db, crypto }) => {
    const user = await db.user.create({
      data: {
        email: 'someEmail',
        password: crypto.hash('somePassword'),
        type: 'ADMIN',
      },
    })
    logger.info(`Created [${user.type}] user with [${user.email}] email`)
  })
