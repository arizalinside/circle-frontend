import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import User from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    User
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      paths: ['Auth.user'],
      storage: window.sessionStorage
    })
  ]
})
