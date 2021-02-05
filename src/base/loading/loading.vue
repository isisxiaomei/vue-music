<template>
  <div class="loading-wrapper">
    <img src="./loading.gif" alt="" />
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl'

.loading-wrapper
  width 100%
  text-align center
  img
    width 60px
    height 60px
  p
    .title
      color $color-text-l
      line-height 20px
      font-size $font-size-small
</style>