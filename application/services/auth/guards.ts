export default {
  admin: defineGuard(({ client }) => {
    return client.auth?.user.group === 'ADMIN'
  }),
}
