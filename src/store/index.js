import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'
import { getCurrentPlayAPI, getCurrentPlayLyricAPI } from '@/api/mainapi.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: JSON.parse(localStorage.getItem('music_state')) || {
    // 登录状态
    // 当前播放歌曲id
    playId: 0,
    // 播放列表·
    playList: [],
    // 当前播放对象
    currentPlay: null,
    // coverUrl: '',
    // 歌词
    lyric: '',
    // 当前播放序列
    currentIndex: '',
    // 当前播放状态
    isPlaying: false,
    // 是否单曲循环
    isLoop: false,
    token: '',
    cookie: '',
    userInfo: {
      nikename: null
    }
  },
  mutations: {
    // 储存本地数据
    // 改变单曲循环状态
    changeLoopState (state, payload) {
      state.isLoop = payload
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    // 改变正在播放的音乐
    changePlayId (state, payload) {
      console.log('我改变了id', payload)
      state.playId = payload
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    // 改变播放状态
    changePlayState (state, payload) {
      state.isPlaying = payload
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
      Message.success('清空播放列表成功')
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
      // 判断歌单长度
      if (state.playList.length >= 1) {
        // console.log('下一首', this, payload)
        // 正常播放
        state.playList.forEach((item, i) => {
          if (item.id === payload) {
            if (i + 1 >= state.playList.length) {
              this.commit('changePlayId', state.playList[0].id)
              state.currentIndex = state.playList[0].id
            } else {
              this.commit('changePlayId', state.playList[i + 1].id)
              state.currentIndex = state.playList[i + 1].id
            }
          }
        })
        // 如果当前播放的歌曲不存在
        if (state.playList.every(item => item.id !== payload)) {
          if (state.currentIndex + 1 >= state.playList.length) {
            this.commit('changePlayId', state.playList[0].id)
          } else {
            this.commit('changePlayId', state.playList[state.currentIndex + 1].id)
          }
        }
      }
    },
    // 上一首
    playPrevSong (state, payload) {
      if (state.playList.length >= 1) {
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
    // 从当前播放列表删除一首歌;
    delOneSong (state, payload) {
      Message.success('移除歌曲成功')
      state.playList = state.playList.filter(item => item.id !== payload)
      localStorage.setItem('music_state', JSON.stringify(state))

      // console.log(state.playList)
    },
    // 储存token
    // initUserToken (state, payload) {
    //   state.token = payload
    //   this.localStorageState()
    // },
    initUserInfo (state, payload) {
      state.userInfo = payload
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    initUserCookie (state, payload) {
      state.cookie = payload
      // console.log(payload)
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    // 退出登录
    clearUserInfo (state) {
      console.log('清空数据')
      state.userInfo = {}
      state.cookie = ''
      // state.commit('clearAllCookie')
      this.commit('clearAllCookie')
      // console.log(this.commit('clearAllCookie'))
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    clearAllCookie () {
      // console.log(123)
      var date = new Date()
      date.setTime(date.getTime() - 10000)
      // eslint-disable-next-line no-useless-escape
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
      console.log('需要删除的cookie名字：' + keys)
      if (keys) {
        for (var i = keys.length; i--;) {
          document.cookie =
            keys[i] + '=0; expire=' + date.toGMTString() + '; path=/'
        }
      }
    }
    // 储存用户信息
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
    async addToList (ctx, payload) {
      const { data: res } = await getCurrentPlayAPI(payload)
      if (res.code === 200) {
        ctx.commit('addPlayList', res.songs[0])
        console.log('添加至播放列表')
        Message.success('添加到播放列表成功')
        // state.addPlayList()
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
    },
    isLogin (state) {
      if (state.cookie && state.userInfo) {
        return true
      } else {
        return false
      }
    }
  }

})
export default store
