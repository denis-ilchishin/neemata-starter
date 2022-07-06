const { randomBytes, createHash } = require('crypto')

module.exports = {
  generate: () => {
    const randomBuffer = randomBytes(512)
    const hasher = createHash('sha1')
    hasher.write(randomBuffer)
    hasher.write(config.auth.secret)
    return hasher.digest('hex')
  },
}
