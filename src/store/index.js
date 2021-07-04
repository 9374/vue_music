import Vue from 'vue'
import Vuex from 'vuex'
import { getCurrentPlayAPI, getCurrentPlayLyricAPI } from '@/api/mainapi.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: JSON.parse(localStorage.getItem('music_state')) || {
    playId: 0,
    playList: [],
    currentPlay: null,
    // coverUrl: '',
    lyric: ''
  },
  mutations: {
    // 改变正在播放的音乐
    changePlayId (state, payload) {
      console.log('我改变了id', payload)
      state.playId = payload
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    // 给播放列表添加
    addPlayList (state, payload) {
      // state.playList = state.playList.filter(item => item.id !== payload.id)
      // state.playList.push(payload)
      if (state.playList.every(item => item.id !== payload.id)) {
        console.log('播放列表没有我加一个')
        state.playList.push(payload)
      } else {
        console.log('播放列表有了,我不加～')
      }
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    // 清空播放列表
    clearPlayList (state) {
      state.playList = []
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    // 改变currentPlay
    changecurrentPlay (state, payload) {
      state.currentPlay = payload
      localStorage.setItem('music_state', JSON.stringify(state))
      // console.log(state.currentPlay)
    },
    // 获取歌词
    changeCurrentLyric (state, payload) {
      state.lyric = payload
      // console.log(state.lyric)
      // console.log(state.lyric)
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    // 下一曲
    playNextSong (state, payload) {
      // console.log('下一首', this, payload)
      state.playList.forEach((item, i) => {
        if (item.id === payload) {
          if (i + 1 >= state.playList.length) {
            this.commit('changePlayId', state.playList[0].id)
          } else {
            this.commit('changePlayId', state.playList[i + 1].id)
          }
        }
      })
    },
    // 上一首
    playPrevSong (state, payload) {
      // console.log('上一首', this, payload)
      state.playList.forEach((item, i) => {
        if (item.id === payload) {
          if (i - 1 < 0) {
            console.log(state.playList.length - 1)
            this.commit('changePlayId', state.playList[state.playList.length - 1].id)
          } else {
            this.commit('changePlayId', state.playList[i - 1].id)
          }
        }
      })
    }
  },
  actions: {
    // 发送请求获取当前播放歌曲的详细信息
    async getCurrentPlay (ctx, id) {
      const { data: res } = await getCurrentPlayAPI(id)
      if (res.code === 200) {
        console.log('歌曲信息', res.songs[0])
        ctx.commit('changecurrentPlay', res.songs[0])
        ctx.commit('addPlayList', res.songs[0])
        console.log(res.songs[0])
        // this.coverUrl = res.songs[0].al.picUrl
      }
    },
    async getCurrentPlayLyric (ctx, id) {
      console.log('获取歌词')
      const { data: res } = await getCurrentPlayLyricAPI(id)
      if (res.code === 200 && res.uncollected === true) {
        ctx.commit('changeCurrentLyric', '当前歌曲暂无歌词')
        console.log('歌词', res, '无歌词')
      } else if (res.code === 200) {
        console.log('歌词', res, '有歌词')
        ctx.commit('changeCurrentLyric', res.lrc.lyric)
      } else {

      }
    }
  },
  getters: {
    playUrl (state) {
      if (!state.playId) {
        return ''
      } else {
        return `https://music.163.com/song/media/outer/url?id=${state.playId}.mp3`
      }
    },
    coverUrl (state) {
      if (state.currentPlay) {
        // console.log('有')
        return state.currentPlay.al.picUrl + '?param=200y200'
      } else {
        return ''
      }
    }
  }

})
export default store
