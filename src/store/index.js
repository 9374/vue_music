import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'
import { getCurrentPlayAPI, getCurrentPlayLyricAPI, getMusicStatusAPI } from '@/api/mainapi.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: JSON.parse(localStorage.getItem('music_state')) || {
    // 当前播放歌曲id
    playId: 0,
    // 被检测id
    PlayStateId: 0,
    // 播放列表·
    playList: [],
    // 当前播放歌曲详细信息对象
    currentPlay: null,
    // 歌词
    lyric: '',
    // 当前播放序列
    currentIndex: 0,
    // 当前播放状态
    isPlaying: false,
    // 是否单曲循环
    isLoop: false,
    // 登录成功储存cookie
    cookie: '',
    // 用户信息
    userInfo: {
      nikename: null
    }
  },
  mutations: {
    // 储存本地数据
    localStorageSet (state) {
      console.log('我要存')
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    // 改变单曲循环状态
    changeLoopState (state, payload) {
      state.isLoop = payload
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    // 改变正在播放的音乐（进入检测）
    changePlayId (state, payload) {
      // console.log('我改变了id', payload)
      state.PlayStateId = payload
      this.dispatch('getMusicStatus', payload)
      // 储存被检测的id
      // if()
      // state.playId = payload
      // this.commit('localStorageSet')
      // localStorage.setItem('music_state', JSON.stringify(state))
    },
    // 检测成功可以播放 进行赋值
    changePlay (state, payload) {
      state.playId = payload
    },
    // 播放前检测是否可以播放的id
    changePlayStateId (state, payload) {
      state.PlayStateId = payload
    },
    // 改变当前播放状态
    changePlayState (state, payload) {
      state.isPlaying = payload
    },
    // 给播放列表添加音乐
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
    // 改变当前播放歌曲信息currentPlay
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
    // 跳过一首
    dropOneSong (state) {
      console.log('不能播放的', state.PlayStateId)
      this.commit('playNextSong', state.PlayStateId)
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
    // 储存用户数据
    initUserInfo (state, payload) {
      state.userInfo = payload
      localStorage.setItem('music_state', JSON.stringify(state))
    },
    // 储存cookie
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
      this.commit('localStorageSet')
    },
    // 清除cookie
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
        // console.log(res.songs[0])
        // this.coverUrl = res.songs[0].al.picUrl
      }
    },
    // 将当前播放添加到播放列表
    async addToList (ctx, payload) {
      const { data: res } = await getCurrentPlayAPI(payload)
      if (res.code === 200) {
        ctx.commit('addPlayList', res.songs[0])
        console.log('添加至播放列表')
        Message.success('添加到播放列表成功')
        // state.addPlayList()
      }
    },
    // 获取当前播放的歌曲歌词
    async getCurrentPlayLyric (ctx, id) {
      console.log('获取歌词')
      const { data: res } = await getCurrentPlayLyricAPI(id)
      if (res.code === 200 && res.nolyric === true) {
        ctx.commit('changeCurrentLyric', '当前歌曲暂无歌词')
        console.log('歌词', res, '无歌词')
      } else if (res.code === 200) {
        console.log('歌词', res, '有歌词')
        ctx.commit('changeCurrentLyric', res.lrc?.lyric)
      } else {

      }
    },
    /**
    * 1. 点击下一首，进入检测函数 检测歌曲是否可用
    * 2.可用 切换歌曲 不可用 进入404 执行跳过函数
    * 3.跳过函数 检测检测id在歌单中的位置，找到就播放被检测的下一首 在进入检测下一首 成功就播放 不成功就继续
    * @param {*} ctx
    * @param {*} id
    */
    // 检测歌曲是否可以用
    async getMusicStatus (ctx, id) {
      const res = await getMusicStatusAPI(id)
      if (res?.data?.success) {
        ctx.commit('changePlay', id)
      }
      // ctx.commit('localStorageSet')
    }
  },
  getters: {
    // 播放地址
    playUrl (state) {
      if (!state.playId) {
        return ''
      } else {
        return `https://music.163.com/song/media/outer/url?id=${state.playId}.mp3`
      }
    },
    // 歌曲封面
    coverUrl (state) {
      if (state.currentPlay) {
        // console.log('有')
        return state.currentPlay.al.picUrl + '?param=100y100'
      } else {
        return ''
      }
    },
    // 登录状态
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
