module.exports = defineAuthModule(async ({ req }) => {
  // Some authentication workflow here

  return { id: 1, group: 'ADMIN' } ?? null
})
