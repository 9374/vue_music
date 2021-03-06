import { Message } from 'element-ui'
import { getCurrentPlayAPI, getMusicStatusAPI } from '@/api/mainapi.js'
export default {
  namespaced: true,
  state: {
    nowPlay: {
      // 当前播放时间
      currentTime: 0,
      // 当前播放id
      playId: '',
      // 歌曲总时间
      totalTime: 0,
      PlayStateId: 0,
      newCurrentTime: 0
    },
    // 当前播放序列
    currentIndex: 0,
    // 当前播放状态
    isPlaying: false,
    // 是否单曲循环
    isLoop: false,
    // 播放列表·
    playList: [],
    // 当前播放歌曲详细信息对象
    currentPlay: '',
    playDetail: false
  },
  mutations: {
    changePlaycurrentTime (state, payload) {
      state.nowPlay.currentTime = payload
    },
    changeNewCurrentTime (state, payload) {
      state.nowPlay.newCurrentTime = payload
    },
    changePlayTotalTime (state, payload) {
      state.nowPlay.totalTime = payload
    },
    // 改变详情显示状态
    changePlayDetailState (state, payload) {
      state.playDetail = payload
      // localStorage.setItem('music_play', JSON.stringify(state))
    },
    // 改变单曲循环状态
    changeLoopState (state, payload) {
      state.isLoop = payload
      // localStorage.setItem('music_play', JSON.stringify(state))
    },
    // 改变正在播放的音乐（进入检测）
    changePlayId (state, id) {
      state.nowPlay.PlayStateId = id // 储存被检测的id
      this.dispatch('play/getMusicStatus', id) // 进行检测
    },
    // 检测成功可以播放 进行赋值
    changePlay (state, id) {
      // console.log('检测完成', id, state.playId)
      state.isPlaying = false
      state.nowPlay.playId = id
      // localStorage.setItem('music_play', JSON.stringify(state))
      setTimeout(() => {
        state.isPlaying = true
      }, 500)
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
    async addPlayList (state, payload) {
      // 如果列表里以及包含 不添加
      if (state.playList.some(item => item.id === payload.id)) {
        return
      }
      console.log('播放列表没有我加一个')
      state.playList.push(payload)
      // localStorage.setItem('music_play', JSON.stringify(state))
    },
    // 清空播放列表
    clearPlayList (state) {
      state.playList = []
      Message.success('清空播放列表成功')
      // localStorage.setItem('music_play', JSON.stringify(state))
    },
    // 改变当前播放歌曲信息currentPlay
    changecurrentPlay (state, payload) {
      state.currentPlay = payload
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
              this.commit('play/changePlayId', state.playList[0].id)
              state.currentIndex = i
            } else {
              this.commit('play/changePlayId', state.playList[i + 1].id)
              state.currentIndex = i
            }
          }
        })
        // 如果当前播放的歌曲不存在
        if (state.playList.every(item => item.id !== payload)) {
          if (state.currentIndex + 1 >= state.playList.length) {
            this.commit('play/changePlayId', state.playList[0].id)
          } else {
            this.commit('play/changePlayId', state.playList[state.currentIndex + 1].id)
          }
        }
      }
    },
    // 跳过一首
    dropOneSong (state) {
      console.log('不能播放的', state.PlayStateId)
      this.commit('play/playNextSong', state.PlayStateId)
    },
    // 上一首
    playPrevSong (state, payload) {
      if (state.playList.length >= 1) {
        // console.log('上一首', this, payload)
        state.playList.forEach((item, i) => {
          if (item.id === payload) {
            if (i - 1 < 0) {
              console.log(state.playList.length - 1)
              this.commit('play/changePlayId', state.playList[state.playList.length - 1].id)
            } else {
              this.commit('play/changePlayId', state.playList[i - 1].id)
            }
          }
        })
      }
    },
    // 从当前播放列表删除一首歌;
    delOneSong (state, payload) {
      Message.success('移除歌曲成功')
      state.playList = state.playList.filter(item => item.id !== payload)
      // localStorage.setItem('music_play', JSON.stringify(state))
    }
  },
  actions: {
    /**
    * 1. 点击下一首，进入检测函数 检测歌曲是否可用
    * 2.可用 切换歌曲 不可用 进入404 执行跳过函数
    * 3.跳过函数 检测检测id在歌单中的位置，找到就播放被检测的下一首 在进入检测下一首 成功就播放 不成功就继续
    * @param {*} ctx
    * @param {*} id
    */
    // 检测歌曲是否可以用
    getMusicStatus (ctx, id) {
      getMusicStatusAPI(id).then(res => {
        if (res.data?.success) {
          ctx.commit('changePlay', id)
        }
      }).catch(err => {
        if (err) {
          ctx.commit('playNextSong', id)
        }
      })
    },
    // 将当前播放添加到播放列表
    async addToList (ctx, id) {
      console.log('添加播放列表', id)
      const { data: res } = await getCurrentPlayAPI(id)
      if (res.code === 200) {
        ctx.commit('addPlayList', res.songs[0])
        // console.log('添加至播放列表')
        Message.success('添加到播放列表成功')
      }
    },
    // 发送请求获取当前播放歌曲的详细信息
    async getCurrentPlay (ctx, id) {
      console.log('详情', id)
      const { data: res } = await getCurrentPlayAPI(id)
      if (res.code === 200) {
        console.log('歌曲信息', res.songs[0])
        await ctx.commit('changecurrentPlay', res.songs[0])
        await ctx.commit('addPlayList', res.songs[0])
        // console.log(res.songs[0])
        // this.coverUrl = res.songs[0].al.picUrl
      }
    }
  },
  getters: {
    playUrl (state) {
      // console.log('播放', state.playId, `https://music.163.com/song/media/outer/url?id=${state.playId}.mp3`)
      if (state.nowPlay.playId !== 0) {
        return `https://music.163.com/song/media/outer/url?id=${state.nowPlay.playId}.mp3`
      } else {
        return ''
      }
    },
    coverUrl (state) {
      if (state.currentPlay) {
        return state.currentPlay.al.picUrl + '?param=400y400'
      } else {
        return ''
      }
    }
  }
}
