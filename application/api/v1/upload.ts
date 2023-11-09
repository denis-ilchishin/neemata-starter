import { Stream, Transport } from '@neemata/adapter-uws'
import { Readable, Writable } from 'node:stream'
import { TypeOf, z } from 'zod'
import application from '../../application.ts'

const inputSchema = z.object({
  file: z.custom<Stream>((v) => v instanceof Readable),
})

export const v1UploadProcedure = application.api.declareProcedure({
  input: inputSchema,
  transport: Transport.Ws,
  handle: (ctx, data: TypeOf<typeof inputSchema>) => {
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

export default v1UploadProcedure
