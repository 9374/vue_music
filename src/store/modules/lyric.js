import { getCurrentPlayLyricAPI } from '@/api/mainapi.js'
export default {
  namespaced: true,
  state: {
    // 歌词
    lyric: '',
    // 翻译后歌词
    lyric2: ''
  },
  mutations: {
    // 储存歌词
    changeCurrentLyric (state, payload) {
      state.lyric = payload.lyric
      state.lyric2 = payload.lyric2
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
