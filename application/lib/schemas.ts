type StreamOptions = { maximum?: number }

const StreamType = Typebox.system.TypeSystem.CreateType<Stream, StreamOptions>(
  'Stream',
  (options, value) => {
    if (!(value instanceof Stream)) return false
    if (options.maximum !== undefined && value.meta.size > options.maximum)
      return false
    return true
  }
)

export default {
  StreamType,
}
