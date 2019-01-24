class Mvvm {
  constructor(options) {
    this.init(options)
    observe(this.$data)
    compile(this)
  }
  init(options) {
    this.$el = document.querySelector(options.el)
    this.$data = options.data
  }
}