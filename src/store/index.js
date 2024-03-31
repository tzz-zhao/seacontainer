import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: "light" || ''
  },
  getters: {
  },
  mutations: {
    updateTheme (state, color) {
      state.theme = color
    }
  },
  actions: {
  },
  modules: {
  }
})
