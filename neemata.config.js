/**
 * @type {import('@neemata/core/types/internal').NeemataConfig}
 */
module.exports = {
  ports: [10000],
  workers: 1,
  api: {
    schema: 'zod',
  },

  log: { level: 'debug' },
  scheduler: {
    tasks: [
      {
        name: 'test',
        cron: '* * * * *',
        task: 'test',
        timeout: 15000,
        args: ['scheduled', { task: 'args' }],
      },
    ],
  },
  intervals: {
    ping: 60000,
  },
}
