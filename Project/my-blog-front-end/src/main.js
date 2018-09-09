import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$_axios = axios

router.beforeEach((to, from, next) => {
    if (
        sessionStorage.getItem('loginStatus') === 'T' &&
        !store.getters.loginStatus
    ) {
        store.commit('login')
    }
    if (to.meta.needLogin) {
        if (!store.getters.loginStatus) {
            alert('请先登录')
            next({
                name: 'homePage'
            })
        }
    }
    next()
})

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
