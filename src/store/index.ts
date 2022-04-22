import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    userInfo: null
  },
  mutations: {
    SET_USER (state, data): void {
      state.userInfo = Object.assign({}, state.userInfo, data)
    },
    REMOVE_STROE (state, stores: Array<string>): void {
      stores.map((store) => {
        state[store] = null
      })
    },
    SET_TOKEN (state, token): void {
      let userInfo = state.userInfo as any
      if (userInfo === null) {
        userInfo = {
          token
        }
      } else {
        userInfo.token = token
      }
      state.userInfo = userInfo
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
})
