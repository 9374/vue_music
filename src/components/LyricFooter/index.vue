<template>
  <div v-show="showlyric" class="lyric">
    <p>
      {{ currentLyric }}
    </p>
    <p v-show="currentTranslationLyric">{{ currentTranslationLyric }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LyricFooter',
  watch: {
    'newLyric.lyric' (newval) {
      if (!newval) {
        this.currentLyric = '暂无歌词'
      } else {
        this.currentLyric = ''
        this.currentTranslationLyric = ''
      }
    },
    'nowPlay.currentTime' (newval) {
      // 根据播放时间展示歌词
      if (this.newLyric.lyric[newval]) {
        this.currentLyric = this.newLyric.lyric[newval]
        if (this.newLyric.lyric2) {
          this.currentTranslationLyric = this.newLyric.lyric2[newval]
        }
      }
    }
  },
  data () {
    return {
      showlyric: true,
      /* 处理后的歌词 */
      currentLyric: '',
      currentTranslationLyric: ''
    }
  },
  computed: {
    ...mapState('lyric', ['newLyric']),
    ...mapState('play', ['nowPlay'])
  }
}
</script>

<style lang="less" scoped>
.lyric {
  flex: 1;
  text-align: center;
  height: 60px;
  line-height: 30px;
  vertical-align: middle;
  font-size: 14px;
  color: red;
}
</style>
