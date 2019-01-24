class Observer {
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.callback = callback;
    this.value = this.getValue()
  }
  subscribe(subject) {
    subject.addObserver(this)
  }
  unSubscribe(subject) {
    subject.removeObserver(this)
  }
  update(value) {
    let oldVal = this.value
    if(value !== oldVal) {
      this.value = value
      this.callback.bind(this.vm)(value, oldVal)
    }
  }
  getValue(){
    currentObserver = this
    let value = this.vm.$data[this.key]
    currentObserver = null
    return value
  }
}