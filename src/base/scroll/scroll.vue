<template>
  <div class="scroll-wrapper" ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {      // 滚动派发事件
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    dataInfo: {       // 传这个变量并且监听，是为了数据变化时，可以重写刷新列表，进而重新计算高度等
      type: Array,
      default: null
    }
  },
  data () {
    return {

    }
  },
  watch: {
    dataInfo () {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  },
  mounted () {
    setTimeout(() => {
      this.initScroll()
    }, 200);
  },
  methods: {
    initScroll () {
      this.bscroll = new BScroll(this.$refs.scrollWrapper, {
        probeType: this.probeType,
        pullUpLoad: true,
        click: this.click
      })
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style lang="stylus">
.scroll-wrapper
  height 100%
  position relative
  overflow hidden
</style>