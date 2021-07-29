<template>
  <div class="playControlBox">
    <div class="control">
      <div class="prev" @click="prev"><i class="el-icon-arrow-left"></i></div>
      <div class="play" @click="onplay">
        <i
          :class="isPlaying ? 'el-icon-video-pause' : 'el-icon-video-play'"
        ></i>
      </div>
      <div class="next" @click="next"><i class="el-icon-arrow-right"></i></div>
    </div>
    <div class="progressBox">
      <span class="Time">{{ s_to_hs(nowPlay.currentTime) }}</span>
      <el-slider
        :format-tooltip="formatTime"
        v-model="nowPlay.currentTime"
        :max="nowPlay.totalTime"
      ></el-slider>
      <span class="Time">{{ s_to_hs(nowPlay.totalTime) }}</span>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
import { s_to_hs } from '@/utils/index.js'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Playcontrol',
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations('play', ['playNextSong', 'playPrevSong', 'changePlayState']),
    s_to_hs,
    formatTime (value) {
      return s_to_hs(value)
    },
    // 点击播放按钮
    onplay () {
      // 改变播放状态 如果不在播放就自动播放 如果在播放就暂停
      if (this.isPlaying) {
        this.changePlayState(false)
      } else {
        this.changePlayState(true)
      }
    },
    // 下一首 改变播放id,
    next () {
      this.playNextSong(this.nowPlay.playId)
    },
    // 上一首
    prev () {
      this.playPrevSong(this.playId)
    }
  },
  computed: {
    ...mapState('play', ['nowPlay', 'isPlaying'])
  }
}
</script>

<style lang="less" scoped>
.playControlBox {
  height: 60px;
  width: 500px;
  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 24px;
    .play {
      margin: 0px 23px;
    }
  }
  .progressBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-slider {
      width: 400px;
      /deep/ .el-slider__runway {
        height: 3px;
        margin: 0;
        .el-slider__bar {
          height: 3px;
          background-color: #ec4141;
        }
        .el-slider__button-wrapper {
          top: -17px;
          .el-slider__button {
            height: 7px;
            width: 7px;
            border: 1px solid #ec4141;
          }
        }
      }
    }
    .Time {
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
