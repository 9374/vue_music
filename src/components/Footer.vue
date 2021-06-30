<template>
  <el-footer class="footer" style="width: 100vw">
    <!-- 正在播放的歌曲信息 -->
    <div class="song"></div>
    <!-- 操作面板 -->
    <div class="play">
      <audio currentTime controls :src="playurl" autoplay></audio>
    </div>
    <!-- 歌单列表 -->
    <div class="menu"></div>
  </el-footer>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  watch: {
    playId (newval) {
      this.playurl = `https://music.163.com/song/media/outer/url?id=${newval}.mp3`
    }
  },
  data () {
    return {
      playurl: ''
    }
  },
  mutations: {
    ...mapMutations(['changePlayId'])
  },
  name: 'Footer',
  computed: {
    ...mapState(['playId'])
  }
}
</script>

<style lang="less" scoped>
.footer {
  // background-color: black;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e6e6e6;
  .play {
    // width: 100px;
    height: 100px;
    background-color: #fff;
  }
}
</style>
