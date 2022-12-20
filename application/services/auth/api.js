hooks.connect = async (...args) => {
  // console.log('Client connected', ...args)
}

hooks.disconnect = async (...args) => {
  // console.log('Client disconnected', ...args)
}

hooks.request = async (opts) => {
  // console.log('Client request', ...args)
}

module.exports = defineAuthModule(async (auth) => {
  // Some authentication workflow here
  // console.dir('authentication: ' + auth)
  // e.g db.knex.select('user').where('token', auth) or jwt.parse(auth)
  return auth ? { id: 1, group: 'ADMIN' } : null
})
