import 'babel-polyfill'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import fastclick from 'fastclick'
import router from './router/index.js'

import 'common/stylus/index.styl'



Vue.use(VueLazyload, {
  loading: require('common/image/default.png'),   // 懒加载图片时，真实图片还没请求到时，默认展示的图片
})


// body中所有的元素点击都没有300毫秒的延迟
fastclick.attach(document.body)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
