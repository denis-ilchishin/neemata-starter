module.exports = defineApiModule({
  auth: false,
  handler: () => {
    return 'some public endpoint'
  },
})
