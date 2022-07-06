module.exports = defineApiModule({
  auth: true,
  guards: [lib.auth.guards.admin],
  handler: async ({ auth }) => {
    return 'User: ' + auth.id
  },
})
