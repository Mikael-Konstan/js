<template>
  <div>
    <div :class="{'isFixed' : isFixed}"></div>
    <div ref='boxFixed'>触发吸顶效果位置</div>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data () {
    return {
      isFixed: false,
      offsetTop: 0,
    }
  },
  mounted () {
    window.addEventListener('scroll', this.initHeight);
    this.$nextTick(() => {
      //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 
      this.offsetTop = this.$refs.boxFixed.offsetTop;
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  method: {
    initHeight () {
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //如果被卷曲的高度大于吸顶元素到顶端位置 的距离
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    }
  }
}
</script>
<style lang="scss" scoped>
.is_fixed {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}
</style>