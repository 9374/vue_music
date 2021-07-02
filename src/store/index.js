import Vue from 'vue'
import Vuex from 'vuex'
import { getCurrentPlayAPI } from '@/api/mainapi.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    playId: 0,
    playList: [],
    currentPlay: {},
    coverUrl: ''
  },
  mutations: {
    // 改变正在播放的音乐
    changePlayId (state, payload) {
      state.playId = payload
    },
    // 给播放列表添加
    addPlayList (state, payload) {
      state.playList.push(payload)
    },
    // 清空播放列表
    clearPlayList (state) {
      state.playList = []
    },
    // 改变currentPlay
    changecurrentPlay (state, payload) {
      state.currentPlay = payload
      console.log(state.currentPlay)
    }

  },
  actions: {
    async getCurrentPlay (ctx, id) {
      const { data: res } = await getCurrentPlayAPI(id)
      if (res.code === 200) {
        ctx.commit('changecurrentPlay', res.songs[0])
        // this.coverUrl = res.songs[0].al.picUrl
      }
    }
  }
  // getters: {
  //   Cover (state) {
  //     return state.currentPlay.al.picUrl
  //   }
  // }

})
export default store
