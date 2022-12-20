module.exports = defineApiModule({
  auth: true,
  schema: lib.zod.object({
    a: lib.zod.number(),
    b: lib.zod.string().optional(),
    c: lib.zod.array(lib.zod.boolean()),
  }),
  transport: 'ws',
  introspectable: services.auth.guards.admin,
  guards: [services.auth.guards.admin],
  handler: ({ data, auth, client }) => {
    return data
  },
})
