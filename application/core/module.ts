import { Module } from '@neematajs/application'
import seedTask from './tasks/seed.ts'
import testTask from './tasks/test.ts'

export const coreModule = new Module().withTasks({
  seed: seedTask,
  test: testTask,
})
