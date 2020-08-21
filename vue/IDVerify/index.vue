<template>
  <div id="ID_Verify_Modal">
    <transition name="opacity">
      <div class="backStyle"
           v-if="activeFlag"></div>
    </transition>
    <transition name='bounce'>
      <div class="ID_Verify_Modal"
           v-if="activeFlag">
        <div class="IDVerify_head">
          <span>{{ tlt }}</span>
          <span @click="close"
                style="cursor: pointer;">
            <a-icon type="close" /></span>
        </div>
        <a-form-model ref="ruleIDVerify"
                      style="margin: 0 24px;"
                      :model="IDVerify"
                      :rules="rules">
          <a-form-model-item style="width: 440px;height: 60px;margin-bottom: 0;"
                             prop="phone">
            <a-input :placeholder="field1"
                     style="height: 38px;width:439px;"
                     v-model="IDVerify.phone" />
          </a-form-model-item>
          <a-form-model-item style="width: 440px;min-height: 60px;margin-bottom: 0;"
                             prop="verifyCode">
            <a-input :placeholder="field2"
                     style="height: 38px;width:274px;margin-right: 19px;"
                     v-model="IDVerify.verifyCode" />
            <a-button type="primary"
                      style="height: 38px;width: 146px;"
                      @click="getVerifyCode">获取验证码</a-button>
          </a-form-model-item>
          <a-form-model-item style="width: 440px;margin-top: 40px;">
            <a-button type="primary"
                      style="height: 38px;width: 439px;"
                      @click="verifyOK">{{ tlt }}</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "IDVerify",
  data () {
    return {
      visible: true,
      activeFlag: false,
      field1: '',
      field2: '',
      tlt: '',
      IDVerify: {
        phone: '',
        verifyCode: '',
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号！', trigger: 'blur' },
          { min: 11, max: 11, message: 'Length should be 11', trigger: 'change' },
        ],
        verifyCode: [
          { required: true, message: '请输入验证码！', trigger: 'blur' },
          { min: 4, max: 6, message: 'Length should be 4 to 6', trigger: 'change' },
        ],
      },
    }
  },
  watch: {
    visible (cur) {
      this.activeFlag = !this.activeFlag
      // 当弹框出现的时候 改变visible 将页面上的弹框Dom移除
      if (cur === false) {
        let timer = setTimeout(function () { // 给动画执行时间
          let tip_alert = document.getElementById('ID_Verify_Modal');
          tip_alert.parentNode.removeChild(tip_alert);
          clearTimeout(timer)
        }, 400)
      }
    }
  },
  methods: {
    getVerifyCode () {
      this.cb_getVerifyCode && this.cb_getVerifyCode(this.IDVerify.phone) // 挂在组件实例上的回调
    },
    verifyOK () {
      this.$refs.ruleIDVerify.validate(valid => {
        if (valid) {
          this.visible = false
          this.cb_verifyOK && this.cb_verifyOK({ // 挂在组件实例上的回调
            phone: this.IDVerify.phone,
            verifyCode: this.IDVerify.verifyCode
          }).then(res => {
            this.$emit('res', res)
          }).catch(err => {
            console.log(err)
            this.$emit('err', err)
          })
        } else {
          return false
        }
      })
    },
    close () {
      this.cb_close && this.cb_close()
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
#ID_Verify_Modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  .backStyle {
    position: fixed;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  .ID_Verify_Modal {
    background-color: #ffffff;
    z-index: 1020;
    position: fixed;
    max-height: 400px;
    overflow: auto;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    min-width: 240px;
    background-clip: padding-box;
    border: 0;
    border-radius: 3%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    .IDVerify_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 56px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      padding: 0 24px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      margin-bottom: 24px;
    }
  }
}

// 动画
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.opacity-enter-active {
  animation: opacityIn 0.4s;
}
.opacity-leave-active {
  animation: opacityOut 0.4s;
}
@keyframes opacityIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes opacityOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.bounce-enter-active {
  animation: bounceIn 2s;
}
.bounce-leave-active {
  animation: bounceDown 2s;
}
@keyframes bounceIn {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    -webkit-transform: translate3d(-50%, 100%, 0);
    transform: translate3d(-50%, 100%, 0);
  }
  50% {
    opacity: 1;
  }
  to {
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
  }
}
@keyframes bounceDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 1;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(-50%, 100%, 0);
    transform: translate3d(-50%, 100%, 0);
  }
}
</style>