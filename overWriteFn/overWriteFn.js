Function.prototype.mikaelCall = function (ctx = window) {
  let args = [...arguments]
  args.shift()
  let sym = Symbol()
  ctx[sym] = this // 直接把方法绑在 目标this上
  let result = ctx[sym](...args)
  delete ctx[sym]
  return result
}

Function.prototype.mikaelApply = function (ctx = window) {
  let args = [...arguments]
  args.shift()
  let sym = Symbol()
  ctx[sym] = this // 直接把方法绑在 目标this上
  let result = ctx[sym](...args[0])
  delete ctx[sym]
  return result
}

Function.prototype.mikaelBind = function (ctx = window) {
  let args = [...arguments]
  args.shift() // 绑定时传的参数
  let fn = this // 直接把方法绑在 目标this上
  return function () {
    // 方法调用又会传入参数
    fn.call(ctx, ...args, ...arguments)
  }
}

function New(Fn) {
  let obj = {}
  let args = [...arguments]
  args.shift()
  obj.__proto__ = Fn.prototype
  obj.__proto__.prototype = Fn
  Fn.apply(obj, args)
  return obj
}

function Instanceof(left, right) {
  let proto = left.__proto__
  let prototype = right.prototype
  while (true) {
    if (proto === null) {
      // Object 指向null
      return false
    } else if (proto === prototype) {
      return true
    }
    proto = proto.__proto__ // 按原型一层层往上找
  }
}

function Create(obj) {
  function Fn() {}
  Fn.prototype = obj
  return new Fn()
}

function delegate(element, eventType, subEle, fn) {
  element.addEventListener(
    eventType,
    (e) => {
      let el = e.target
      while (!el.matches(subEle)) {
        //
        if (element === el) {
          el = null
          break
        }
        el = el.parentNode
        // console.log(el.matches(subEle))
      }
      el && fn.call(el, e, el)
    },
    true
  )
  return element
}

function currying(fn) { // 缩小适用范围
  // args 获取第一个方法内的全部参数
  let num = fn.length
  var args = Array.prototype.slice.call(arguments, 1)
  return function func() {
    // 将后面方法里的全部参数和args进行合并
    args = args.concat(Array.prototype.slice.call(arguments))
    // 把合并后的参数通过apply作为fn的参数并执行
    return args.length < num ? func : fn.apply(this, args)
  }
}

function uncurrying() {
  var that = this;
  return function() {
      return Function.prototype.call.apply(that, arguments);
  }
}
