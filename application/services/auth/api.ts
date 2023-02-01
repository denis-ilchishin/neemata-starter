hooks.connect = async (...args) => {
  console.log('Client connected', ...args)
}

hooks.disconnect = async (...args) => {
  console.log('Client disconnected', ...args)
}

hooks.call = async (opts) => {
  console.log('Client call', opts)
}

export default defineAuthModule(async (auth) => {
  // Some authentication workflow here
  // console.dir('authentication: ' + auth)
  // e.g db.knex.select('user').where('token', auth) or jwt.parse(auth)
  return auth ? { id: 1, group: 'ADMIN' } : null
})
