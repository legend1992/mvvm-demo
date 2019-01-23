class Mvvm {
  constructor(options) {
    this.init(options)
    observe(this.$data)
    this.traverse(this.$el)
  }
  init(options) {
    this.$el = document.querySelector(options.el)
    this.$data = options.data
    // this.observers = []
  }
  traverse(node){
    if(node.nodeType === 1){
      node.childNodes.forEach(childNode=>{
        this.traverse(childNode)
      })
    }else if(node.nodeType === 3){ //文本
      this.renderText(node)
    }
  }
  renderText(node){
    let reg = /{{(.+?)}}/g
    let match
    while(match = reg.exec(node.nodeValue)){
      let raw = match[0]
      let key = match[1].trim()
      node.nodeValue = node.nodeValue.replace(raw, this.$data[key])
      new Observer(this, key, function(val, oldVal){
        node.nodeValue = node.nodeValue.replace(oldVal, val)
      })
    }    
  }
}