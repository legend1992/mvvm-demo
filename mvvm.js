class Mvvm {
  constructor(options) {
    this.init(options)
    observe(this.$data)
    compile(this)
  }
  init(options) {
    this.$el = document.querySelector(options.el)
    this.$data = options.data || {}
    this.$methods = options.methods || {}
    for(let key in this.$methods) {
      this.$methods[key] = this.$methods[key].bind(this)
    }
    for(let key in this.$data) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: ()=> {
          return this.$data[key]
        },
        set: newVal=> {
          this.$data[key] = newVal
        }        
      })
    }
  }
}