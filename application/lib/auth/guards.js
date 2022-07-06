module.exports = {
  admin: defineGuardModule(({ auth, req }) => {
    return auth.group === 'ADMIN'
  }),
}
