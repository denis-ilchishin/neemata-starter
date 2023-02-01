import { createHash, randomBytes } from 'node:crypto'

export default {
  generate: () => {
    const randomBuffer = randomBytes(64)
    const hasher = createHash('sha1')
    hasher.update(randomBuffer)
    return hasher.digest('hex')
  },
}
