// 时间戳转格式日期
export function formatDateTime(time = new Date(), format = 'yyyy-MM-dd HH:mm:ss') {
  var t = new Date(time)
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
        break
      case 'MM':
        return tf(t.getMonth() + 1)
        break
      case 'mm':
        return tf(t.getMinutes())
        break
      case 'dd':
        return tf(t.getDate())
        break
      case 'HH':
        return tf(t.getHours())
        break
      case 'ss':
        return tf(t.getSeconds())
        break
    }
  })
}
// 获取每个月天数
export function getDays(year = new Date().getFullYear(), month = 1) {
  let days = [31, 28, 31, 30, 31, 30, 31, 30, 30, 31, 30, 31]
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    days[1] = 29
  }
  return days[month]
}
// 获取本机IP
export function getIp() {
  const os = require('os')
  const ifaces = os.networkInterfaces() // 获取本机ip
  let ip = ''
  out: for (let i in ifaces) {
    for (let j in ifaces[i]) {
      let val = ifaces[i][j]
      if (val.family === 'IPv4' && val.address !== '127.0.0.1') {
        ip = val.address
        break out
      }
    }
  }
  return ip
}
// 复制到粘贴板
export function copyTxt(text) {
  return new Promise((resolve, reject) => {
    try {
      let textCopy = document.createElement('textarea')
      textCopy.value = text
      textCopy.style.position = 'fixed'
      textCopy.style.zIndex = -1
      textCopy.style.top = '0'
      textCopy.style.left = '0'
      textCopy.style.width = '1rem'
      textCopy.style.height = '1rem'
      textCopy.style.padding = '0'
      textCopy.style.border = 'none'
      textCopy.style.outline = 'none'
      textCopy.style.boxShadow = 'none'
      textCopy.style.background = 'transparent'
      document.body.appendChild(textCopy)
      textCopy.select()
      if (document.execCommand('Copy', 'false', true)) {
        resolve()
      } else {
        reject()
      }
      document.body.removeChild(textCopy)
    } catch (err) {
      reject(err)
    }
  })
}
// 数据分页 前端数据量不是特别大的情况
export function showdata(arr = [], originAry = [], page = 1, size = 10) {
  arr.splice(0)
  let start = (page - 1) * size
  for (let i = 0; i < size; i++) {
    if (start >= originAry.length) return arr // 取得数据在原数组长度内
    arr.push(originAry[start])
    start++
  }
  return arr
}
// 节流
export function throttle(
  _that = document.body,
  delay = 3000,
  success = function() {
    console.log('执行成功')
  },
  error = function() {
    console.log('请勿频繁操作')
  }
) {
  let arguType = Object.prototype.toString.call(arguments[0])
  if (arguType == '[object Number]' || arguType == '[object String]') {
    delay = arguments[0]
    _that = document.body
    if (arguments[1] && Object.prototype.toString.call(arguments[1]) == '[object Function]') {
      success = arguments[1]
    }
  }
  if (arguType == '[object Function]') {
    delay = 600
    _that = document.body
    success = arguments[0]
  }
  let Now = Date.now()
  let pastTime = _that.getAttribute('throttle')
  if (pastTime) {
    pastTime = parseInt(pastTime)
    if (Now - pastTime < parseInt(delay)) return error() // 设定时间内返回
  }
  _that.setAttribute('throttle', Now)
  Now = null
  success()
}
// 防抖
export function debounce(
  _that = document.body,
  delay = 600,
  fn = function() {
    console.log('已执行')
  }
) {
  let arguType = Object.prototype.toString.call(arguments[0])
  if (arguType == '[object Number]' || arguType == '[object String]') {
    delay = arguments[0]
    _that = document.body
    if (arguments[1] && Object.prototype.toString.call(arguments[1]) == '[object Function]') {
      fn = arguments[1]
    }
  }
  if (arguType == '[object Function]') {
    delay = 600
    _that = document.body
    fn = arguments[0]
  }
  let flag = _that.getAttribute('debounce')
  clearTimeout(flag) // 清除上一个定时器让fn不执行
  flag = setTimeout(function() {
    fn()
  }, delay)
  _that.setAttribute('debounce', flag)
  flag = null
}
// 检测纯数字字符
export function testNumber(str) {
  let flag1 = str.indexOf('.') === str.lastIndexOf('.')
  let flag2 = str.lastIndexOf('-') === -1 || str.lastIndexOf('-') === 0
  if (!flag1 || !flag2) {
    // 检测 - .  数量 0-1
    return false
  }
  if (str[0] !== '-') {
    // 正数
    if (str[0] == '.') {
      // 首字符不能为 .
      return false
    } else if (str[0] == '0' && str[1] !== '.' && str.length > 1) {
      // 0后是小数点可以跟任意数，否则只能为空
      return false
    } else {
      return str.split('').every((item) => {
        // 纯数字 检测每一个字符
        return /[-.0-9]/.test(item)
      })
    }
  } else if (str[0] == '-') {
    // 负数
    if (str[1] == '.') {
      return false
    } else if (str[1] == '0' && str[2] !== '.' && str.length > 2) {
      return false
    } else {
      return str.split('').every((item) => {
        return /[-.0-9]/.test(item)
      })
    }
  }
}
// 图片懒加载
export function imgLazyLoad(selector = '.imgLazyLoad') {
  //立即执行函数
  let imgList = [],
    delay,
    time = 250,
    offset = 0;
  imgLoadInit(selector)
  function imgLoadInit(selector) { //获取所有需要实现懒加载图片对象引用并设置window监听事件scroll
    let nodes = document.querySelectorAll(selector)
    imgList = Array.apply(null, nodes)
    window.addEventListener('scroll', _delay, false)
  }
  function _delay() { //函数节流
    clearTimeout(delay)
    delay = setTimeout(() => {
      _loadImg()
    }, time)
  }
  function _loadImg() { //执行图片加载
    for (let i = 0, len = imgList.length; i < len; i++) {
      if (_isShow(imgList[i])) {
        imgList[i].src = imgList[i].getAttribute('data-src')
        imgList.splice(i, 1)
      }
    }
  }
  function _isShow(el) { //判断img是否出现在可视窗口
    let coords = el.getBoundingClientRect()
    return (
      (coords.left >= 0 && coords.left >= 0 && coords.top) <=
      (document.documentElement.clientHeight || window.innerHeight) +
        parseInt(offset)
    )
  }
}