export default defineApiModule({
  schema: Typebox.Type.Object({
    a: Typebox.Type.Number(),
    b: Typebox.Type.Optional(Typebox.Type.String()),
    c: Typebox.Type.Array(Typebox.Type.Boolean()),
  }),
  transport: 'ws',
  introspectable: services.auth.guards.admin,
  guards: [services.auth.guards.admin],
  handler: () => {
    return `Complex private endpoint accessible for authenticated request only, and via ws transport only. 
    Endpoint is introspectable only for admin users. 
    Endpoint is guarded by "admin" guard. 
    Also, validated against custom schema`
  },
})
