module.exports = {
  admin: defineGuard(({ auth, req }) => {
    return auth?.group === 'ADMIN'
  }),
}
