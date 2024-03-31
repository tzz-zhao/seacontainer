import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: "black"
  },
  getters: {
    themeNow (state) {
      return state.theme
    }
  },
  mutations: {
    updateTheme (state, color) {
      state.theme = color
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.localStorage, // 或者 localStorage
  })]
})
