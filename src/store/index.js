import Vue from 'vue'
import Vuex from 'vuex'
import lyric from './modules/lyric.js'
import user from './modules/user.js'
import play from './modules/play.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    lyric,
    user,
    play
  }
})
export default store
