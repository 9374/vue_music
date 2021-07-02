import Vue from 'vue'
import Vuex from 'vuex'
import { getCurrentPlayAPI, getCurrentPlayLyricAPI } from '@/api/mainapi.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    playId: 0,
    playList: [],
    currentPlay: {},
    coverUrl: '',
    lyric: ''
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
      // console.log(state.currentPlay)
    },
    changeCurrentLyric (state, payload) {
      state.lyric = payload
      // console.log(state.lyric)
      // console.log(state.lyric)
    }

  },
  actions: {
    async getCurrentPlay (ctx, id) {
      const { data: res } = await getCurrentPlayAPI(id)
      if (res.code === 200) {
        console.log('歌曲信息', res.songs[0])
        ctx.commit('changecurrentPlay', res.songs[0])
        // this.coverUrl = res.songs[0].al.picUrl
      }
    },
    async getCurrentPlayLyric (ctx, id) {
      const { data: res } = await getCurrentPlayLyricAPI(id)
      if (res.code === 200 && res.uncollected === true) {
        ctx.commit('changeCurrentLyric', '当前歌曲暂无歌词')
        console.log('歌词', res)
      } else if (res.code === 200) {
        console.log('歌词', res)
        ctx.commit('changeCurrentLyric', res.lrc.lyric)
      } else {

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
