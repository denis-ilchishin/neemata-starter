import {
  createConsoleDestination,
} from '@neematajs/application'
import { ApplicationServer } from "@neematajs/server"
import { fileURLToPath } from 'url'

export default new ApplicationServer({
  applicationPath: fileURLToPath(new URL('./application.ts', import.meta.url)),
  taskWorkers: 1,
  apiWorkers: [[+process.env.API_PORT! || 42069]],
  logging: {
    destinations: [createConsoleDestination('debug')],
  },
})
