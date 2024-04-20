import { Event } from '@neematajs/application'

export const uploadFinishEvent = new Event().withPayload<string>()
