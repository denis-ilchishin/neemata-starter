import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'

export default defineProcedure({
  auth: false,
  transport: 'ws', // Temporary streams are not supported for http transport
  schema: Typebox.Type.Object({
    info: Typebox.Type.String(),
    file: Typebox.Stream({ maximum: 100 * 1024 * 1024 }),
  }),
  handler: async ({ data, client }) => {
    const { info, file } = data

    await new Promise((r) => setTimeout(r, 1500)) // Some async operation, db or cache access, etc.

    file.pipe(
      createWriteStream(resolve('tmp', file.meta.name || 'uploaded-file'))
    )

    file.done().then(() => {
      client.send('file-uploaded', { info, file: file.meta })
    })

    return `Simple endpoint with binary file upload.
    Validated against custom schema with maximum file size of 100MB.
    File is saved to tmp folder.
    File starts steaming only after async operation is done.
    Notification is sent to client after file is saved`
  },
})
