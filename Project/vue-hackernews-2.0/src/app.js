import Vue from 'vue'
import App from './App.vue'
import {
  createStore
} from './store'
import {
  createRouter
} from './router'

// 把 vue-router 的状态放进 vuex 的 state 中
// 可以通过改变 state 來进行路由操作
// 例：store.state.route.path 改变之后，当前页面的 path 也会一起改变，反之也一样
import {
  sync
} from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'

// mixin for handling title
Vue.mixin(titleMixin)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp() {
  // 创建 store 和 router 实例
  const store = createStore()
  const router = createRouter()

  // 同步 store 和 router
  sync(store, router)

  // 创建 app 实例
  // 我们将路 router，store 和 ssr context 注入所有子组件
  // 之后我们可以在任意页面和组件中使用 `this。$ router` 和 `this。$ store`
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  // 暴露 app, router 和 store
  // 注意，我们不在此时 mount 
  // 因为引导将根据我们是在客户端或者服务端有所不同
  return {
    app,
    router,
    store
  }
}