export default {
  admin: defineGuard(({ client }) => {
    return client.auth?.group === 'ADMIN'
  }),
}
