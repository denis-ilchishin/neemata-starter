import app from 'application/application.ts'
import { createHash, randomBytes } from 'node:crypto'

const algorithm = 'md5'
const encoding = 'hex'

// just an example
export const cryptoProvider = app.provider().withFactory(() => {
  function hash(input: string) {
    return createHash(algorithm).update(input).digest(encoding)
  }

  function compare(input: string, hashed: string) {
    return hash(input) === hashed
  }

  function generateToken(
    length: number = 32,
    encoding: BufferEncoding = 'hex'
  ) {
    return randomBytes(length).toString(encoding)
  }

  return {
    hash,
    compare,
    generateToken,
  }
})
