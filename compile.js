let _this;
function compile(mvvm) {
  _this = mvvm;
  let { $el:node } = mvvm;
  traverse(node)
}
function traverse(node) {
  if (node.nodeType === 1) {//标签
    compileNode(node)
    node.childNodes.forEach(childNode => {
      traverse(childNode)
    })
  } else if (node.nodeType === 3) {//文本
    compileText(node)
  }
}
function compileText(node) {
  let reg = /{{(.+?)}}/g
  let match
  while (match = reg.exec(node.nodeValue)) {
    let raw = match[0]
    let key = match[1].trim()
    node.nodeValue = node.nodeValue.replace(raw, _this.$data[key])
    new Observer(_this, key, function (val, oldVal) {
      node.nodeValue = node.nodeValue.replace(oldVal, val)
    })
  }
}
function compileNode(node) {
  let attrs = [...node.attributes]
  attrs.forEach(attr => {
    if (isDirective(attr.name)) {
      let key = attr.value
      node.value = _this.$data[key]
      new Observer(_this, key, function (newVal) {
        node.value = newVal
      })
      node.oninput = (e) => {
        _this.$data[key] = e.target.value
      }
    }
  })
}
//判断属性名是否是指令
function isDirective(attrName) {
  return attrName === 'v-model'
}