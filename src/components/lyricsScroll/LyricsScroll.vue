<template>
  <div class="lyricDetail">
    <div class="placeholder"></div>
    <!-- 没有翻译 -->
    <!--     :class="currentTime == index ? 'currentLyric' : ''" -->
    <div
      :class="lyricsIndex - 1 == index ? 'currentLyric' : ''"
      class="lyricItem"
      v-for="(item, index) in newLyric2.lyric"
      :key="index"
    >
      {{ item[1] }}
    </div>

    <div class="placeholder"></div>
    <!-- <div class="placeholder"></div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
let placeholderHeight = 0

export default {
  watch: {
    // 监听vuex中的musicId 重置歌词索引
    playId (musicId) {
      this.lyricsIndex = 0
    },
    // 监听当前播放时间
    'nowPlay.currentTime' (currentTime, lastTime) {
      // 如果两个时间间隔有1秒,则可得知进度条被拖动 需要重新校准歌词index
      // 当歌词数量大于1并且索引为零时,可能歌词位置差距较大,走这个if进行快速跳转
      if (
        (lastTime && Math.abs(currentTime - lastTime) >= 1) ||
        // eslint-disable-next-line eqeqeq
        (this.lyricsIndex == 0 && this.newLyric2.lyric.length > 1)
      ) {
        // 处理播放时间跳转时歌词位置的校准
        if (this.newLyric2.lyric.length > 1) {
          this.getCurrentLyricsIndex(currentTime)
          // 滑动到当前歌词
          this.lyricScroll(this.lyricsIndex)
        }
      }
      // 根据实时播放时间实现歌词滚动
      if (this.lyricsIndex < this.newLyric2.lyric.length) {
        if (currentTime >= this.newLyric2.lyric[this.lyricsIndex][0]) {
          this.lyricsIndex += 1
          this.lyricScroll(this.lyricsIndex)
        }
      }
    },
    'newLyric2.lyric' (current) {
      console.log('获取了歌词')
      // 大于一秒，说明歌词在1秒后才请求成功 歌词可能不能马上跳转到当前时间 这里进行校准
      if (this.nowPlay.currentTime > 1) {
        // 处理播放时间跳转时歌词位置的校准
        if (this.newLyric2.lyric.length > 1) {
          this.getCurrentLyricsIndex(this.nowPlay.currentTime)
          this.$nextTick(() => {
            // 滑动到当前歌词
            this.lyricScroll(this.lyricsIndex)
          })
        }
      }
    }
  },
  name: 'LyricsScroll',
  data () {
    return {
      lyricsIndex: 0
    }
  },
  methods: {
    // 实现歌词滚动
    lyricScroll (currentLyric) {
      // 获取歌词item
      const lyricsArr = document.querySelectorAll('.lyricItem')
      // 获取歌词框
      const lyrics = document.querySelector('.lyricDetail')
      // placeholder的高度
      // eslint-disable-next-line eqeqeq
      if (placeholderHeight == 0) {
        placeholderHeight = lyricsArr[0].offsetTop - lyrics.offsetTop
        console.log('第一句歌词距离歌词框的距离', lyricsArr[0].offsetTop)
        console.log('歌词框距离顶部的距离', lyrics.offsetTop)
      }
      //   歌词item在歌词框的高度 = 歌词框的offsetTop - 歌词item的offsetTop
      //   console.log(currentLyric);
      if (lyricsArr[currentLyric - 1]) {
        const distance = lyricsArr[currentLyric - 1].offsetTop - lyrics.offsetTop
        //   lyricsArr[currentLyric].scrollIntoView();
        lyrics.scrollTo({
          behavior: 'smooth',
          top: distance - placeholderHeight
        })
      }
    },
    // 获取当前歌词索引
    getCurrentLyricsIndex (currentTime) {
      let lyricsIndex = 0
      this.newLyric2.lyric.some((item) => {
        // 改
        if (lyricsIndex < this.newLyric2.lyric.length - 1) {
          if (currentTime > item[0]) {
            lyricsIndex += 1
          }
          return currentTime <= item[0]
        }
      })
      // console.log(lyricsIndex);
      this.lyricsIndex = lyricsIndex
    }
  },
  computed: {
    ...mapState('play', ['nowPlay', 'playId']),
    ...mapState('lyric', ['newLyric2', 'newLyric'])
  },

  created () {
    // console.log(this.lyric)
  }
}
</script>

<style lang="less" scoped>
.placeholder {
  width: 100%;
  height: 40%;
}
.lyricDetail {
  height: 375px;
  font-size: 14px;
  width: 400px;
  text-align: center;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .lyricItem {
    font-size: 12px;
    height: 20px;
    margin: 17px;
    transition: all 0.5s;
  }
  .currentLyric {
    font-weight: 600;
    font-size: 14px;
    color: black;
  }
}
</style>
