// Called on websocket connection
module.connection = defineConnectionHook(async ({ auth, client }) => {
  console.log('Client connected: ' + auth?.id)
})

// Called on websocket disconnection
module.disconnection = defineConnectionHook(async ({ auth, client }) => {
  console.log('Client disconnected: ' + auth?.id)
})

module.exports = defineAuthModule(async (auth) => {
  // Some authentication workflow here
  // console.dir('authentication: ' + auth)
  // e.g db.knex.select('user').where('token', auth) or jwt.parse(auth)
  return auth ? { id: 1, group: 'ADMIN' } : null
})
