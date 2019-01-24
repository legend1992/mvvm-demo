function observe(obj) {
  if(!obj || typeof obj !== 'object') {
    return
  }
  for (const key in obj) {
    let subject = new Subject()
    if (obj.hasOwnProperty(key)) {
      let val = obj[key];
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
          console.log('get', currentObserver)
          if(currentObserver){
            currentObserver.subscribe(subject)
          }
          return val
        },
        set(newVal) {
          console.log('set newVal', newVal)
          val = newVal
          subject.notify(newVal)
        }
      })
      if(typeof val === 'object') {
        observe(val)
      }
    }
  }
}