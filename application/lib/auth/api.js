module.exports = defineAuthModule(async ({ req }) => {
  // Some authentication workflow here
  console.dir('api')

  return { id: 1, group: 'ADMIN' } ?? null
})
