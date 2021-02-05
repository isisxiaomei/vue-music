<template>
  <div class="recommend" ref="recommend">
    <scroll
      class="recommend-content"
      ref="scrollRef"
      :data-info="distcList"
      v-if="distcList.length"
    >
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="item of recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img
                  class="needsclick"
                  :src="item.picUrl"
                  alt=""
                  @load="loadImage"
                />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item, index) of distcList" :key="index">
              <div class="icon">
                <!-- <img :src="item.imgurl" width="60" height="60" /> -->
                <img v-lazy="item.imgurl" width="60" height="60" />
              </div>
              <div class="text">
                <h2 class="name">{{ item.creator.name }}</h2>
                <p class="desc">{{ item.dissname }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!distcList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from "base/slider/slider";
import Scroll from 'base/scroll/scroll';
import { getRecommendAPI, getDiscListAPI } from 'api/recommend'
import Loading from 'base/loading/loading';

import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      recommends: [],   // 轮播图片数据
      distcList: [],    // 
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created () {
    this.getRecommend()
    setTimeout(() => {
      this.getDiscList()
    }, 3000);

  },
  methods: {
    getRecommend () {
      getRecommendAPI().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    getDiscList () {
      getDiscListAPI().then(res => {
        if (res.code === ERR_OK) {
          this.distcList = res.data.list
        }
      })
    },

    // 通过判断distcList是否有值，来进行scroll滚动的高度计算是不够的的；因为拿到数据，真正有高度的时候是图片加载了，所以这里通过图片加载事件触发scroll刷新，重新计算高度
    loadImage () {
      // 通过变量控制确保只执行一次
      // 原因是图片很多不需要每加载一张就触发，只要有一张加载，知道高度就可以刷新scroll了
      if (!this.checkLoaded) {
        this.$refs.scrollRef.refresh()
        this.checkLoaded = true
      }
    }
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.recommend
  position fixed
  width 100%
  top 88px
  bottom 0
  .recommend-content
    // height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      overflow hidden
    .recommend-list
      .list-title
        height 65px
        line-height 65px
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        display flex
        box-sizing border-box
        align-items center
        padding 0 20px 20px 20px
        .icon
          flex 0 0 60px
          width 60px
          padding-right 20px
        .text
          display flex
          flex-direction column
          justify-content center
          flex 1
          line-height 20px
          overflow hidden
          font-size $font-size-medium
          .name
            margin-bottom 10px
            color $color-text
          .desc
            color $color-text-d
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>