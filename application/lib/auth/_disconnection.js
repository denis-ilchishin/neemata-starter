module.exports = defineConnectionHook(async ({ auth, client }) => {
  console.log('User disconnected: ' + auth.id)
})
