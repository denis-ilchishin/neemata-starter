import { publicProcedure } from '#procedures'
import { Stream } from '@neemata/application'
import { Writable } from 'node:stream'
import { z } from 'zod'

export default publicProcedure
  .withInput(
    z.object({
      file: z.custom<Stream>((v) => v instanceof Stream),
    })
  )
  .withHandler(({ app: { connection } }, data) => {
    // emulate a writable stream
    const stream = new Writable({ write: (c, e, cb) => cb() })
    data.file.pipe(stream)
    stream.on('finish', () => {
      // try send an event to the client when stream finished
      connection.send('finished', 'Yay! Server has received the file!')
    })
  })
