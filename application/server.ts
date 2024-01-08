import {
  ApplicationServer,
  createConsoleDestination,
} from '@neemata/application'
import { fileURLToPath } from 'url'

export default new ApplicationServer({
  applicationPath: fileURLToPath(new URL('./bootstrap.ts', import.meta.url)),
  taskWorkers: 0,
  apiWorkers: [
    [+process.env.HTTP_PORT! || 42069, +process.env.WS_PORT! || 42070],
  ],
  logging: {
    destinations: [createConsoleDestination('debug')],
  },
})
