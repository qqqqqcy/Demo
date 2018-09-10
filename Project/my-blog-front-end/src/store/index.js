import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginStatus: false
    },
    getters: {
        loginStatus: (state) => state.loginStatus
    },

    mutations: {
        login(state) {
            state.loginStatus = true // 假定登陆成功后，设置 state.
        },
        logout(state) {
            state.loginStatus = false
        }
    }
})
