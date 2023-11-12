import { Stream, Transport } from '@neemata/adapter-uws'
import { Readable, Writable } from 'node:stream'
import { z } from 'zod'
import application from '../../application.ts'

export default application.api.declareProcedure({
  transport: Transport.Ws,
  input: z.object({
    file: z.custom<Stream>((v) => v instanceof Readable),
  }),
  handle: (ctx, data) => {
    // emulate a writable stream
    const stream = new Writable({ write: (c, e, cb) => cb() })
    data.file.pipe(stream)
    stream.on('finish', () => {
      // try send an event to the client when stream finished
      ctx.request!.websocket!.send(
        'finished',
        'Yay! Server has received the file!'
      )
    })
  },
})
