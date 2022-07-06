module.exports = defineConnectionHook(async ({ auth, client, req }) => {
  console.log('User connected via ws: ' + auth.id)
})
