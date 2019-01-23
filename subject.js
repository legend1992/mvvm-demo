class Subject {
  constructor() {
    this.observers = []
  }
  addObserver(observe) {
    this.observers.push(observe)
  }
  removeObserver(observe) {
    if(this.observers.indexOf(observe) > -1) {
      this.observers.splice(index,1)
    }
  }
  notify(value) {
    this.observers.forEach(function(observer){
      observer.update(value)
    })
  }
}