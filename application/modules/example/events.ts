import app from '#app'

export const uploadFinishEvent = app.event().withPayload<string>()
