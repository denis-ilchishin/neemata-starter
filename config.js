module.exports = {
  ports: [10000, 10001],
  workers: 3,
  server: {
    hostname: '0.0.0.0',
    cors: '*',
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
