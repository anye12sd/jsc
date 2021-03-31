import Vue from 'vue'
import Vuex from 'vuex'
import config from "./public/config"
import jurisdiction from "./public/jurisdiction"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    config,jurisdiction
  }
})
