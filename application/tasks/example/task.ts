import { setTimeout } from 'node:timers/promises'

export default async (arg: string) => {
  console.dir({ arg, msg: 'Task is beeing executed' })

  await setTimeout(3000)

  return { a: '1', b: 2 }
}
