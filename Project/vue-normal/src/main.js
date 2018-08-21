// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import filter from './filters'
import store from './store';


Vue.prototype.$_axios = axios

// 全局过滤器引入
console.log(filter)
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
