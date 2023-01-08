const Typebox = require('@sinclair/typebox')

module.exports = defineApiModule({
  auth: false,
  schema: Typebox.Type.Number(),
  schema: Typebox.Type.Object({
    a: Typebox.Type.Number(),
    b: Typebox.Type.Optional(Typebox.Type.String()),
    c: Typebox.Type.Array(Typebox.Type.Boolean()),
  }),
  transport: 'ws',
  introspectable: services.auth.guards.admin,
  guards: [services.auth.guards.admin],
  handler: ({ data, auth, client }) => {
    return data
  },
})
