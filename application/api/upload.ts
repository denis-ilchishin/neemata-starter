import { Stream, Transport, defineProcedure } from '@neemata/server'
import { Readable, Writable } from 'node:stream'
import { z } from 'zod'

const schema = z.object({
  // injecting Readable stream into "file" prop here is being done under the hood
  file: z.custom<Stream>((value) => value instanceof Readable),
})

export default defineProcedure({
  transport: Transport.Ws,
  input: (ctx, data) => schema.parseAsync(data),
  handle: async (ctx, data, { websocket }) => {
    // imitate some writable stream
    const stream = new Writable({
      write: (chunk, encoding, callback) => callback(),
    })
    data.file.pipe(stream)
    stream.on('finish', () => {
      // send and event to the client
      websocket.send('finished', 'Yay! Server has received the file!')
    })
  },
})
