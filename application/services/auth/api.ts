hooks.connect = async ({ client, req }) => {
  console.log('Client connected')
}

hooks.disconnect = async ({ client, req }) => {
  console.log('Client disconnected')
}

hooks.call = async ({ client, procedure, req, data }) => {
  console.log('Client call')
}

export default defineAuthService(async ({ req, session }) => {
  // Some authentication workflow here
  // e.g db.knex.select('user').where('token', auth) or jwt.parse(auth)
  return { user: { id: 1, group: 'ADMIN' } }
})
