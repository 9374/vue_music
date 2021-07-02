<template>
  <el-row>
    <el-col :span="12">
      <audio ref="audio" controls :src="playurl" autoplay></audio
    ></el-col>
    <el-col :span="12">
      <div class="player">
        <div class="disk" :class="{ disk__playing: isPlaying }">
          <!-- 旋转封面 -->
          <label
            class="disk_cover"
            ref="cover"
            for="file"
            :style="{
              transform: stopMatrix,
              backgroundImage: coverUrl ? `url(${coverUrl})` : '',
            }"
          />
        </div>
        <!-- 控制部分 -->
        <div class="control" :class="{ control__playing: isPlaying }">
          <div class="control_btn control_btn__side">
            <!-- 下一曲-->
            <i class="el-icon-arrow-left" />
          </div>
          <div class="control_btn">
            <!-- 播放按钮 -->
            <i @click="play" :class="icon"> </i>
            <!-- <span class="play-btn" /> -->
          </div>
          <!--    上一曲 -->
          <div class="control_btn control_btn__side">
            <i class="el-icon-arrow-right" />
          </div>
        </div>
        <!--  // 播放进度-->
        <div class="progress" :class="{ progress__playing: isPlaying }">
          <!-- 歌曲名称 -->
          <h2 class="progress_title">{{ name }}</h2>
          <!-- 歌曲时间 -->
          <p class="progress_text">
            {{ position }} /
            {{ s_to_hs(duration) }}
          </p>
          <!--  //duration -->
          <!-- 进度条 -->
          <div class="progress_line">
            <span :style="{ width: progress }" />
          </div>
        </div>
      </div>
      ></el-col
    >
  </el-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      playurl: '',
      name: '123',
      isPlaying: false,
      stopMatrix: 0,
      coverUrl: '',
      // 当前时间
      position: 0,
      // 总时间
      duration: 0,
      // 进度条
      progress: 0,
      playSong: {}
    }
  },
  watch: {
    playId (newval) {
      this.changeUrl()
    }
  },
  methods: {
    changeUrl () {
      this.playurl = `https://music.163.com/song/media/outer/url?id=${this.playId}.mp3`
      this.$nextTick(() => {
        this.duration = this.$refs.audio.duration
      })
    },
    ...mapMutations(['changePlayId']),
    play () {
      if (this.isPlaying) {
        // console.log()
        this.$refs.audio.pause()
        this.duration = this.$refs.audio.duration
        console.log(this.$refs.audio.duration)
      } else {
        this.$refs.audio.play()
        console.log(this.$refs.audio.duration)
      }
      this.isPlaying = !this.isPlaying
    },
    s_to_hs (s) {
      // 计算分钟
      // 算法：将秒数除以60，然后下舍入，既得到分钟数
      var h
      h = Math.floor(s / 60)
      // 计算秒
      // 算法：取得秒%60的余数，既得到秒数
      s = s % 60
      // 将变量转换为字符串
      h += ''
      s += ''
      // 如果只有一位数，前面增加一个0
      h = (h.length === 1) ? '0' + h : h
      s = (s.length === 1) ? '0' + s : s
      s = s.substring(0, 2)
      return h + ':' + s
    }
  },
  computed: {
    ...mapState(['playId']),
    icon () {
      if (this.isPlaying) {
        return 'el-icon-video-pause'
      } else {
        return 'el-icon-video-play'
      }
    }

  }

}

</script>

<style lang="less" scoped>
.player {
  position: relative;
  display: flex;
  max-width: 300px;
  max-height: 75px;
  width: 300px;
  height: 75px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12),
    0 20px 20px rgba(95, 23, 101, 0.2);
}
.player_disk {
  flex: 1.2;
  padding: 12px;
}
.player_control {
  flex: 2;
  padding: 12px 0;
  padding-right: 12px;
}
.player_progress {
  position: absolute;
  left: 9px;
  right: 9px;
  top: 0;
  bottom: 25px;
  z-index: -1;
}
//disk
.disk {
  position: relative;
  padding-top: 100%;
  border-radius: 100%;
  overflow: hidden;
  transform: translateY(-50%) scale(0.88);
  transform-origin: center bottom;
  transition: all 0.6s ease;
}
.disk input {
  display: none;
}
.disk_cover {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background-image: radial-gradient(circle, #444 0%, #333 100%);
  background-size: cover;
  background-position: center;
}
.disk_cover::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-image: linear-gradient(45deg, white, #dabad1);
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
}
.disk__playing {
  transform: translateY(-50%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
    0 20px 20px -10px rgba(108, 29, 171, 0.3);
}
.disk__playing .disk_cover {
  animation: rotate infinite 6s linear;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
// control
.control {
  display: flex;
  height: 100%;
}
.control_btn {
  display: flex;
  margin: 2px;
  align-items: center;
  justify-content: center;
  flex: 1;
  border-radius: 4px;
  color: #ccc;
  font-size: 16px;
  transition: background-color 0.6s ease;
}
.control_btn:hover {
  background-color: #ddd;
  color: white;
}
.control_btn__side {
  font-size: 14px;
}
.play-btn {
  position: relative;
  width: 20px;
  height: 20px;
}
.play-btn::before {
  content: "";
  position: absolute;
  left: 11px;
  top: 50%;
  margin-left: -4px;
  margin-top: -10px;
  width: 0;
  height: 0;
  border: 12px solid transparent;
  border-left-color: #ccc;
  border-top-width: 10px;
  border-bottom-width: 10px;
  transition: all 0.2s ease;
}
.play-btn::after {
  content: "";
  position: absolute;
  right: 5px;
  top: 50%;
  margin-right: -4px;
  margin-top: -10px;
  width: 0;
  height: 20px;
  border: 0 solid transparent;
  border-width: 0 0 0 6px;
  border-left-color: #ccc;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s ease;
}
.control__playing .play-btn::before {
  border-width: 0 0 0 6px;
  height: 20px;
  left: 5px;
}
.control__playing .play-btn::after {
  opacity: 1;
  transform: scale(1);
}
.control_btn:hover .play-btn::before {
  border-left-color: white;
}
.control_btn:hover .play-btn::after {
  border-color: white;
}
//progressBar

.progress {
  padding-left: 123px;
  padding-right: 12px;
  height: 100%;
  border-radius: 6px 6px 0 0;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.6s ease;
}
.progress__playing {
  transform: translateY(-100%);
}
.progress_title {
  padding-top: 6px;
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
}
.progress_text {
  padding-top: 2px;
  padding-left: 2px;
  font-size: 12px;
  font-weight: bold;
  color: #ccc;
  transform: scale(0.6);
  transform-origin: left top;
}
.progress_line {
  height: 3px;
  border-radius: 3px;
  overflow: hidden;
  background-color: #ddd;
}
.progress_line span {
  display: block;
  height: 100%;
  background-color: #ec51a5;
}
</style>
