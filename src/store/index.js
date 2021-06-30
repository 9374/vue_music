import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    playId: 0,
    playList: []
  },
  mutations: {
    changePlayId (state, payload) {
      state.playId = payload
    },
    addPlayList (state, payload) {
      state.playList.push(payload)
    },
    clearPlayList (state) {
      state.playList = []
    }
  }

})
export default store
