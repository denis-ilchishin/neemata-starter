import { Event } from '@neemata/application'

export const events = {
  test: new Event<{ type: 'a' }>(),
  anothertest: new Event<{ type: 'b' }>(),
  finished: new Event<string>(),
}
