import app from '#app'
import { Stream } from '@neemata/application'
import { Writable } from 'node:stream'
import { z } from 'zod'

export default app
  .procedure()
  .withInput(
    z.object({
      file: z.custom<Stream>((v) => v instanceof Stream),
    })
  )
  .withHandler(({ client }, data) => {
    // emulate a writable stream
    const stream = new Writable({ write: (c, e, cb) => cb() })
    data.file.pipe(stream)
    stream.on('finish', () => {
      // try send an event to the client when stream finished
      client.send('finished', 'Yay! Server has received the file!')
    })
  })
