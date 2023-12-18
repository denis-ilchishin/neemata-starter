import { Stream } from '@neemata/application'
import { Readable, Writable } from 'node:stream'
import { z } from 'zod'
import { declareProcedure } from '../../helpers.ts'

export default declareProcedure({
  input: z.object({
    file: z.custom<Stream>((v) => v instanceof Readable),
  }),
  handle: ({ client, injections }, data) => {
    // emulate a writable stream
    const stream = new Writable({ write: (c, e, cb) => cb() })
    data.file.pipe(stream)
    stream.on('finish', () => {
      // try send an event to the client when stream finished
      client.send('finished', 'Yay! Server has received the file!')
    })
  },
})
