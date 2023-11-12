import application from '../application.ts'
import { cryptoProvider } from '../domain/crypto.ts'

export const testTask = application.extensions.tasks.declareTask(
  async ({ logger, injections }) => {
    logger.info('Some CPU-heavy task is being done here...')
    for (let i = 0; i < 10000; i++) {
      injections.crypto.hash(''.padEnd(10, (i ** 2).toString()))
    }

    return 'Done!'
  },
  {
    crypto: cryptoProvider,
  }
)

export default testTask
