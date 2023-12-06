import { ApplicationServer } from '@neemata/application'
import { fileURLToPath } from 'url'

export default new ApplicationServer({
  applicationPath: fileURLToPath(new URL('./application.ts', import.meta.url)),
  taskWorkers: 1,
  apiWorkers: [+process.env.PORT! || 42069],
  applicationOptions: {
    logging: {
      level: 'trace',
    },
    api: {
      path: fileURLToPath(new URL('./api', import.meta.url)),
    },
    tasks: {
      path: fileURLToPath(new URL('./tasks', import.meta.url)),
    },
  },
})
