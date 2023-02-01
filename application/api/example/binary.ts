import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'

export default defineApiModule({
  auth: false,
  schema: Typebox.Type.Object({
    info: Typebox.Type.String(),
    file: lib.schemas.StreamType({ maximum: 10 * 1024 * 1024 }),
  }),
  handler: async ({ data, client }) => {
    const { info, file } = data

    await new Promise((r) => setTimeout(r, 5000)) // Some async operation, db or cache access, etc.

    file.pipe(
      createWriteStream(resolve('tmp', file.meta.name || 'uploaded-file'))
    )

    file.done().then(() => {
      if (client.transport === 'ws')
        client.send('file-uploaded', { info, file: file.meta })
    })

    return `Simple endpoint with binary file upload.
    Validated against custom schema with maximum file size of 10MB.
    File is saved to tmp folder.
    File starts steaming only after async operation is done.
    Notification is sent to client after file is saved, if the call was made via ws transport`
  },
})
