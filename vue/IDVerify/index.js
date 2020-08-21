import Vue from 'vue'
import IDVerify from '@/components/IDVerify/index.vue'

let IDVerifyConstructor = Vue.extend(IDVerify)

function cb () {}

export default function idVerifyModel ({
  tlt = '身份验证',
  field1 = '请输入手机号',
  field2 = '请输入验证码'
} = {}, getCode = cb, OKBtn = cb, close = cb) {
  let idverifyDom = new IDVerifyConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(idverifyDom.$el)

  // 传入data属性
  idverifyDom.activeFlag = true
  idverifyDom.tlt = tlt
  idverifyDom.field1 = field1
  idverifyDom.field2 = field2
  // 传入回调方法
  idverifyDom.cb_getVerifyCode = getCode;
  idverifyDom.cb_verifyOK = OKBtn;
  idverifyDom.cb_close = close;
  return new Promise((resolve, reject) => {
    idverifyDom.$on('res', res =>{
      resolve(res)
    })
    idverifyDom.$on('err', err =>{
      reject(err)
    })
  })
}