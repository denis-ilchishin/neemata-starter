/**
 * @type {import('@neemata/core/types/internal').NeemataConfig}
 */
module.exports = {
  ports: [10000, 10001],
  workers: 1,
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
