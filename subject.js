class Subject {
  constructor() {
    this.observes = []
  }
  subscribe(observe) {
    this.observes.push(observe)
  }
  unSubscribe(observe) {
    if(this.observes.indexOf(observe) > -1) {
      this.observes.splice(index,1)
    }
  }
}
export default Subject