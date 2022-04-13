import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    userInfo: null
  },
  mutations: {
    SET_USER (state, data): void {
      state.userInfo = data
    },
    REMOVE_STROE (state, stores: Array<string>): void {
      stores.map((store) => {
        state[store] = null
      })
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
})
