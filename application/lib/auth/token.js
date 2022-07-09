const { randomBytes, createHash } = require('crypto')

module.exports = {
  generate: () => {
    const randomBuffer = randomBytes(512)
    const hasher = createHash('sha1')
    hasher.update(Buffer.concat(randomBuffer, Buffer.from(config.auth.secret)))
    return hasher.digest('hex')
  },
}
