import { getCurrentPlayLyricAPI } from '@/api/mainapi.js'
export default {
  namespaced: true,
  state: {
    // 歌词
    lyric: {
      lyric: '',
      lyric2: ''
    },
    // lyric: '',
    // // 翻译后歌词
    // lyric2: '',
    // 处理后的歌词
    newLyric: {
      lyric: { 0: '正在加载歌词' },
      lyric2: ''
    },
    // 滚动的歌词
    newLyric2: {
      lyric: '',
      lyric2: ''
    }
    // newLyric: '',
    // newLyric2: ''
  },
  mutations: {
    // 储存歌词
    changeCurrentLyric (state, payload) {
      state.lyric = payload
      // state.lyric2 = payload.lyric2
      this.commit('lyric/formatLyric')
      this.commit('lyric/formatLyric2')
    },
    // // 调用方法开始处理歌词
    // changeLyric (state) {
    //   if (state.lyric && state.lyric !== '当前歌曲暂无歌词') {
    //     console.log('开始处理歌词', state.lyric)
    //     state.newLyric = this.commit('lyric/formatLyric', state.lyric)
    //     console.log(this.commit('lyric/formatLyric', state.lyric))
    //     console.log('处理完成', state.newLyric)
    //   } else {
    //     state.newLyric = ''
    //     // state.currentLyric = '当前歌曲暂无歌词'
    //   }
    //   if (state.lyric2) {
    //     state.newLyric2 = this.commit('lyric/formatLyric')
    //   } else {
    //     state.newLyric2 = null
    //   }
    // },
    /**
 * 歌词处理逻辑
 *  逻辑大师 10:20.12 split => 10:20 split => 10*60+ 10:20.12 split => 10:20 .split => 20 *1
  10*60 +20
   time: item[0].split('.')[0].split(':')[0] * 60 + item[0].split('.')[0].split(':')[1] * 1,
  text: item[1]
 */
    // 格式化歌词的函数
    formatLyric (state) {
      // const obj3 = {}
      for (const key in state.lyric) {
        if (state.lyric[key]) {
          const arr = state.lyric[key].split('[')
          // console.log(arr)
          const newarr = []
          // const arr2 = []
          arr.forEach(item => {
            newarr.push(item.split(']'))
          })
          const obj = {}
          // console.log(newarr)
          newarr.forEach((item, i) => {
            const time = item[0].split('.')[0].split(':')[0] * 60 + item[0].split('.')[0].split(':')[1] * 1
            // 底部歌词
            obj[time] = item[1]
            state.newLyric[key] = obj
          })
        } else {
          state.newLyric[key] = ''
        }
      }
      // console.log(newarr2)
    },
    // 格式化滚动歌词
    formatLyric2 (state) {
      console.log('执行滚动歌词格式化')
      //   console.log(res);
      if (state.lyric.lyric) {
        const lyrics = state.lyric.lyric
        // 对获取到的歌词进行处理
        let arr = lyrics.split('\n')
        const array = []
        // let obj = {};
        let time = ''
        let value = ''
        const result = []

        // 去除空行
        arr.forEach((item) => {
          // eslint-disable-next-line eqeqeq
          if (item != '') {
            array.push(item)
          }
        })
        arr = array
        arr.forEach((item) => {
          time = item.split(']')[0]
          value = item.split(']')[1]
          // 去掉时间里的中括号得到xx:xx.xx
          var t = time.slice(1).split(':')
          // 将结果压入最终数组
          result.push([parseInt(t[0], 10) * 60 + parseInt(t[1]), value])
        })

        state.newLyric2.lyric = result
      }

      // console.log(this.lyric);
    }
  },
  actions: {
    // 获取当前播放的歌曲歌词
    async getCurrentPlayLyric (ctx, id) {
      console.log('获取歌词')
      const { data: res } = await getCurrentPlayLyricAPI(id)
      if (res.code === 200) {
        if (res.nolyric === true) {
          console.log('没有歌词')
          ctx.commit('changeCurrentLyric', { lyric: '', lyric2: '' })
        } else {
          console.log('有歌词', res)
          ctx.commit('changeCurrentLyric', { lyric: res.lrc?.lyric, lyric2: res.tlyric?.lyric })
        }
      }
    }
  }
}
