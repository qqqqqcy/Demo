import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  sentence: "some state thing in Vuex"
}

var store = new Vuex.Store({
  state,
//   getters,
//   actions,
//   mutations,
//   strict: false // 不采用严格模式
});

export default store;
