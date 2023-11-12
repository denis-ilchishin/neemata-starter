import { TasksExtension } from '@neemata/extensions'
import { fileURLToPath } from 'node:url'

export const tasks = new TasksExtension({
  path: fileURLToPath(new URL('./tasks', import.meta.url)),
  pool: {
    logLevel: 'trace',
    extensionPath: fileURLToPath(import.meta.url), // require to be like this since this code is also executed in a worker thread, beside the main thream api
    size: 2, // number of threads
  },
})

export default tasks
