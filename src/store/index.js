import Vue from 'vue'
import Vuex from 'vuex'
import lyric from './modules/lyric.js'
import user from './modules/user.js'
import play from './modules/play.js'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    lyric,
    user,
    play
  },
  plugins: [createPersistedState({ key: 'music_user' })]
})
export default store
