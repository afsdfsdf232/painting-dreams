import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    userInfo: null
  },
  mutations: {
    SET_USER (state, data) {
      state.userInfo = data
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
})
