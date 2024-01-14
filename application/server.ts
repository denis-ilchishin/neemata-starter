import {
  ApplicationServer,
  createConsoleDestination,
} from '@neemata/application'
import { fileURLToPath } from 'url'

export default new ApplicationServer({
  applicationPath: fileURLToPath(new URL('./bootstrap.ts', import.meta.url)),
  taskWorkers: 1,
  apiWorkers: [[+process.env.API_PORT! || 42069]],
  logging: {
    destinations: [createConsoleDestination('debug')],
  },
})
