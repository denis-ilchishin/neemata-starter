import { publicProcedure } from '#common/procedure.ts'
import { uploadFinishEvent } from '#modules/example/events.ts'
import { Stream } from '@neematajs/application'
import { Writable } from 'node:stream'
import { z } from 'zod'

export default publicProcedure
  .withInput(
    z.object({
      file: z.custom<Stream>((v) => v instanceof Stream),
    })
  )
  .withHandler(({ connection }, data) => {
    // emulate a writable stream
    const stream = new Writable({ write: (c, e, cb) => cb() })
    data.file.pipe(stream)
    stream.on('finish', () => {
      // try send an event to the client when stream finished
      connection.send(uploadFinishEvent, 'Yay! Server has received the file!')
    })
  })
