# 项目目录结构

src/base: 通用基础组件
src/components: 业务组价
src/common: 公共数据
src/api: 接口调用封装


# 依赖安装
```js
//对es的语法做转义
babel-runtime

// 移动端点击300毫秒延迟问题
fastclick

// 对es6的API比如promise做转义
babel-polyfill

// node中间件 用来压缩请求
compression

// 是非常常用的一个express中间件，作用是对post请求的请求体进行解析
body-parser

// Express的中间件，用来实现cookie的解析
cookie-parser

// 移动端滚动； 也可支持轮播
better-scroll
```

# 知识点

浏览器刷新17毫秒一次

```html
<!-- 这里必须保证传递给slider的插槽是有值的 ，所以加了if判断；因为有可能recommends的异步数据还没有回来，但是slider已经渲染了-->
<div class="slider-wrapper" v-if="recommends.length">
  <slider>
    <div v-for="item of recommends" :key="item.id">
      <a href="item.linkUrl">
        <img :src="item.picUrl" alt="" />
      </a>
    </div>
  </slider>
</div>
```




---

# 插件问题汇总

## jsonp

jsonp库：https://github.com/webmodules/jsonp

```js
// 回调函数协商在option中，使用param指定
// 第三个参数是jsonp对返回结果处理的回调
jsonp(url, option, (error, data) => {
    if (!error) {
    resolve(data)
    } else {
    reject(error)
    }
})
```

## better-scroll

better-scroll：移动端的滚动插件

better-scroll可以支持轮播图效果，也可以做页面滚动效果；后续需要自己再测试下vue-swiper能否支持移动端轮播图

`better-scroll使用注意点：`

- 第一点：不管是轮播还是滚动，都需要确保除轮播图组件或者滚动组件渲染之前，其他的父组件都渲染完成；因为轮播和滚动都是需要基于外层组件进行宽度和高度的差值计算的；如果有些组件没渲染出来，那么swiper和scroll获取到的高度或者宽度计算就会不准确

```html
<!-- 这里必须保证传递给slider的插槽是有值的 ，所以加了if判断；因为有可能recommends的异步数据还没有回来，但是slider已经渲染了.这时候就没有图片slider数据，所以计算
出来的宽度就是0，后面异步请求回来了，只会进行更新而不会进行组件mounted，而我们的计算宽度方法就是在mounted中存放着
-->
<div class="slider-wrapper" v-if="recommends.length">
  <slider>
    <div v-for="item of recommends" :key="item.id">
      <a href="item.linkUrl">
        <img :src="item.picUrl" alt="" />
      </a>
    </div>
  </slider>
</div>
```

```js
// slider.js
mounted () {
  setTimeout(() => {
    this.setSliderWidth()
    this.initSlider()
    this.initDots()
  }, 20);
},
```

- 第二点：任何时候如果出现无法滚动的情况，都应该首先查看 content 元素高度/宽度是否大于 wrapper 的高度/宽度。这是内容能够滚动的前提条件。

```html
<!-- 只有scroll-content的高度或者宽度大于scroll-wrapper时，才会出现滚动或者轮播滑动 -->
<template>
  <div class="core-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <div class="scroll-item" v-for="(item, index) in emojis" :key="index" @click="clickHandler(item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>
```

- 第三点：如果页面有数据变化，或者dom更改的情况，必须让scroll进行refresh刷新操作，重新计算页面高度和宽度

---


问题点：滚动不到底部？

清楚两个点，一个是数据的请求时异步加载的，另一个点是数据中的图片加载完成才可以知道高度，这样滚动才可以计算高度，所有需要给加图片加load事件，只需要其中一张的高度就可以

```js
// 通过判断distcList是否有值，来进行scroll滚动的高度计算是不够的的；因为拿到数据，真正有高度的时候是图片加载了，所以这里通过图片加载事件触发scroll刷新，重新计算高度
loadImage () {
  // 通过变量控制确保只执行一次
  // 原因是图片很多不需要每加载一张就触发，只要有一张加载，知道高度就可以刷新scroll了
  if (!this.checkLoaded) {
    this.$refs.scrollRef.refresh()
    this.checkLoaded = true
  }
```



## vue-lazyload

vue-lazyload可以进行图片懒加载操作

页面的图片，可以等到滚动到某处时，再加载某处的图片。具体可以在控制台的network/img处查看图片加载

```js
// 使用：现在main.js中引入插件，在使用需要懒加载的图片处将src替换成v-lazy
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('common/image/default.png'),   // 懒加载图片时，真实图片还没请求到时，默认展示的图片
})
<!-- <img :src="item.imgurl" width="60" height="60" /> -->
<img v-lazy="item.imgurl" width="60" height="60" />
```




# webpack配置

## vue-cli4的别名配置问题

```js
// vue.config.js
module.exports = {
  // cli-4配置别名
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        api: "@/api",
        views: "@/views",
        store: "@/store"
      }
    }
  },
}
```

```css
/* 别名配置之后在stylus中引入的时候需要加 ~ 号才可以识别 */
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
```
```js
// 别名配置之后在vue文件中直接使用别名导入就可以
import Singer from 'components/singer/singer.vue'
```

# 组件封装思想
