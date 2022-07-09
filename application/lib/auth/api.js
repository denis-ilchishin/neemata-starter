module.exports = defineAuthModule(async (auth) => {
  // Some authentication workflow here
  console.dir('authentication: ' + auth)
  return auth ? { id: 1, group: 'ADMIN' } : null
})
