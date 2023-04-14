await dependency('services.example')

export default {
  nested: 'index',
  dependency: services.example.doSome3(),
}
