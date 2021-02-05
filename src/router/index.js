import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from 'components/recommend/recommend.vue'
import Rank from 'components/rank/rank.vue'
import Search from 'components/search/search.vue'
import Singer from 'components/singer/singer.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/rank',
    component: Rank
  },
  {
    path: '/search',
    component: Search
  }
]
const router = new VueRouter({
  routes
})
export default router