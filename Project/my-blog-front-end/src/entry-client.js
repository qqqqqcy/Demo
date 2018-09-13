import { createApp } from './app'
import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'

const { app } = createApp

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

app.$mount('#app')
