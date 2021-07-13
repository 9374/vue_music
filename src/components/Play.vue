<template>
  <el-row>
    <!-- 播放器 -->
    <el-col :span="12">
      <div class="player">
        <div class="player_disk">
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
        </div>
        <!-- 控制部分 -->
        <div class="player_control">
          <div class="control" :class="{ control__playing: isPlaying }">
            <div @click="prev" class="control_btn control_btn__side">
              <!-- 上一曲-->
              <i class="el-icon-arrow-left" />
            </div>
            <div class="control_btn" @click="onplay">
              <!-- 播放按钮 -->
              <i
                :class="
                  isPlaying ? 'el-icon-video-pause' : 'el-icon-video-play'
                "
              >
              </i>
              <!-- <span class="play-btn" /> -->
            </div>
            <!--    下一曲 -->
            <div @click="next" class="control_btn control_btn__side">
              <i class="el-icon-arrow-right" />
            </div>
          </div>
        </div>
        <!--  // 播放进度-->
        <div class="player_progress">
          <div class="progress" :class="{ progress__playing: isPlaying }">
            <!-- 歌曲名称 -->
            <h2 class="progress_title">
              {{ playId ? currentPlay.name : "暂无播放歌曲" }}
            </h2>
            <!-- 歌曲时间 -->
            <p class="progress_text">
              {{ s_to_hs(position) }} /
              {{ s_to_hs(duration) }}
            </p>
            <!--  //duration -->
            <!-- 进度条 -->
            <div class="progress_line">
              <span :style="{ width: progress }" />
            </div>
          </div>
        </div>
      </div>
      ></el-col
    >
    <!-- 歌词框 -->
    <el-col :span="12">
      <div v-if="newLyric" class="lyric">
        <p>
          {{ currentLyric }}
        </p>
      </div></el-col
    >
    <!-- audio标签 -->
    <el-col :span="0">
      <audio
        ref="audio"
        @timeupdate="onupdate"
        @canplay="getDuration"
        @play="play"
        @pause="pause"
        :src="playUrl"
        preload="metadata"
        autoplay
        @ended="end"
        :loop="isLoop"
      ></audio
    ></el-col>
  </el-row>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      /* 当前歌词 */
      contentText: '',
      /* 处理后的歌词 */
      newLyric: [],
      // playurl: '',
      stopMatrix: 0,
      // coverUrl: '',
      // 当前时间
      position: 0,
      // 总时间
      duration: 0,
      // 进度条 定义在计算属性
      // progress: 0,
      playSong: {},
      timer: null,
      timer1: null,
      currentLyric: ''
    }
  },
  watch: {
    // 检测播放id变化 改变播放id  获取播放歌曲详细信息，获取歌词
    playId (newval) {
      // console.log(this.playUrl)
      // 改变当前播放的id
      this.changePlayId(newval)
      // 获取封面
      // this.getCover()
      // 获取当前播放歌曲的详情
      this.getCurrentPlay(newval)
      // 获取当前播放歌曲的歌词
      this.getCurrentPlayLyric(newval)
      // this.changeLyric()

      // console.log('当前id', newval)
    }
  },
  methods: {
    ...mapMutations(['changePlayId', 'playNextSong', 'playPrevSong', 'changePlayState']),
    ...mapActions(['getCurrentPlay', 'getCurrentPlayLyric']),
    // 下一首 改变播放id,
    next () {
      this.playNextSong(this.playId)
      console.log('当前播放id', this.playId, '点击下一首')
    },
    // 上一首
    prev () {
      this.playPrevSong(this.playId)
      console.log('当前播放id', this.playId, '点击上一首')
    },
    // 歌曲加载完成自动获取总时长
    getDuration () {
      this.duration = this.$refs.audio.duration
    },
    // 当音乐开始播放
    play () {
      // 改变播放状态
      this.changePlayState(true)
      // 如果没有歌词 发送请求获取歌词
      if (!this.newLyric) {
        this.getCurrentPlayLyric(this.playId)
      }
      // 如果详细信息不等于正在播放的歌曲 自动获取最新的
      if (this.currentPlay.id !== this.playId) {
        this.getCurrentPlay(this.playId)
      }
      // 处理歌词
      this.changeLyric()
    },
    // 音乐暂停
    pause () {
      // 改变播放状态
      this.changePlayState(false)
    },
    // 歌曲进度更新时
    onupdate () {
      // 动态更新播放事件
      if (this.$refs.audio.currentTime) {
        this.position = this.$refs.audio.currentTime
      }
      // 根据播放时间展示歌词
      if (this.newLyric[parseInt(this.position)]) {
        this.currentLyric = this.newLyric[parseInt(this.position)]
      }
    },
    // 点击播放按钮
    onplay () {
      // 改变播放状态 如果不在播放就自动播放 如果在播放就暂停
      if (this.isPlaying === false) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    // 音乐播放完毕
    end () {
      // 改变播放状态
      this.changePlayState(false)
      // this.isPlaying = false
      console.log('结束播放')
      // 触发下一曲事件
      this.$store.commit('playNextSong', this.playId)
    },
    // 处理歌词
    changeLyric () {
      setTimeout(() => {
        if (this.lyric) {
          console.log('开始处理歌词')
          const arr = this.lyric.split('[')
          // console.log(arr)
          const newarr = []
          // const arr2 = []
          arr.forEach(item => {
            newarr.push(item.split(']'))
          })
          const obj2 = {}
          // console.log(newarr)
          newarr.forEach((item, i) => {
            // console.log(item)
            // const obj = {
            //   // 逻辑大师 10:20.12 split => 10:20 split => 10*60+ 10:20.12 split => 10:20 .split => 20 *1
            //   // 10*60 +20
            //   time: item[0].split('.')[0].split(':')[0] * 60 + item[0].split('.')[0].split(':')[1] * 1,
            //   text: item[1]
            // }
            obj2[item[0].split('.')[0].split(':')[0] * 60 + item[0].split('.')[0].split(':')[1] * 1] = item[1]
            // console.log(item[0].split('.')[0].split(':')[0] * 60)
            // // console.log(item[0].split('.')[0].split(':')[0])
            // console.log(item[0].split('.')[0].split(':')[1] * 1)
            // newarr[i] = item[0].split('.')[0].split(':')
            // arr2.push(obj)
          })
          // console.log(obj2)
          this.newLyric = obj2
          // console.log(arr2)
        }
      }, 1000)
    },
    // 过滤器
    s_to_hs (s) {
      // 计算分钟
      // 算法：将秒数除以60，然后下舍入，既得到分钟数
      var h
      h = Math.floor(s / 60)
      // 计算秒
      // 算法：取得秒%60的余数，既得到秒数
      s = parseInt(s % 60)
      // 将变量转换为字符串
      h += ''
      s += ''
      // 如果只有一位数，前面增加一个0
      h = (h.length === 1) ? '0' + h : h
      s = (s.length === 1) ? '0' + s : s
      // s = s.substring(0, 2)
      return h + ':' + s
    }
  },
  computed: {
    ...mapState(['playId', 'currentPlay', 'lyric', 'playList', 'isPlaying', 'isLoop']),
    ...mapGetters(['playUrl', 'coverUrl']),
    // 计算进度条长度
    progress () {
      // 如果有播放地址
      if (this.playUrl) {
        // 算出当前播放占比
        const str = this.position / this.duration
        // 转百分比
        return `${(str * 100).toFixed(2)}%`
      } else {
        return 0
      }
    }
  }
}

</script>

<style lang="less" scoped>
.lyric {
  height: 10vh;
  padding: 10px;
  // height: 20px;
  color: red;
  overflow: hidden;
}
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
  padding-bottom: 4px;
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
  padding-bottom: 4px;
  // height: 100%;
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
