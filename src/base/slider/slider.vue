<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item, index) of dots"
        :key="index"
        :class="{ active: currentPageIndex === index }"
      ></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * 轮播图组件说明：
 * slider表示视口宽度，也是每个slider-item的宽度
 * slider-group的宽度是所有的slider-item的和
 * slider-item是每个图片
 */

import BScroll from "better-scroll";
import Slide from '@better-scroll/slide'
import { addClass } from "common/js/dom.js";

BScroll.use(Slide)

export default {
  name: 'slider',
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {         // 循环
      type: Boolean,
      default: true
    },
    autoplay: {         // 自动播放
      type: Boolean,
      default: true
    },
    interval: {     // 播放间隔
      type: Number,
      default: 3000
    }
  },
  mounted () {
    setTimeout(() => {
      this.setSliderWidth()
      this.initSlider()
      this.initDots()
    }, 20);
  },
  methods: {
    // 计算设置slider宽度
    setSliderWidth () {
      this.children = this.$refs.sliderGroup.children
      let sliderWidth = this.$refs.slider.clientWidth
      let widthSum = 0

      this.children.forEach(childItem => {
        addClass(childItem, 'slider-item')
        childItem.style.width = sliderWidth + 'px'
        widthSum += sliderWidth
      });
      console.log(1111, this.children.length);
      // 如果是循环轮播，需要额外加上两个视口宽度
      if (this.loop) {
        widthSum += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = widthSum + 'px'
    },
    initSlider () {
      this.sliderBS = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        slide: {}
      })
      this.sliderBS.on('scrollEnd', () => {
        let pageIndex = this.sliderBS.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
      })
    },
    initDots () {
      this.dots = new Array(this.children.length)
    },
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.slider
  min-height 1px
  .slider-group
    position relative
    overflow hidden
    white-space nowrap
    .slider-item
      float left
      box-sizing border-box
      overflow hidden
      text-align center
      a
        display block
        width 100%
        overflow hidden
        text-decoration none
      img
        display block
        width 100%
  .dots
    position absolute
    right 0
    left 0
    bottom 12px
    text-align center
    font-size 0
    .dot
      display inline-block
      margin 0 4px
      width 8px
      height 8px
      border-radius 50%
      background $color-text-l
      &.active
        width 20px
        border-radius 5px
        background $color-text-ll
</style>