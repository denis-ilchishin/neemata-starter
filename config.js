module.exports = {
  ports: [9000],
  server: {
    hostname: '0.0.0.0',
    cors: '*',
  },
  redis: {
    url: `${process.env.REDIS_PROTOCOL}://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  },
  auth: {
    lib: 'auth.api',
  },
  scheduler: {
    tasks: [
      {
        name: 'test',
        cron: '* * * * *',
        task: 'test',
        args: ['scheduled', 'task'],
      },
    ],
  },
}
