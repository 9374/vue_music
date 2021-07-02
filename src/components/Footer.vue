<template>
  <el-footer class="footer" style="width: 100vw">
    <el-row>
      <el-col :span="20">
        <div class="song">
          <Play></Play></div
      ></el-col>
      <el-col :span="1">
        <!-- 操作面板 -->
        <div class="play">
          <!--  -->
        </div>
      </el-col>
      <el-col :span="1">
        <div class="menu"></div>
      </el-col>
    </el-row>
    <!-- 正在播放的歌曲信息 -->

    <!-- 歌单列表 -->
  </el-footer>
</template>

<script>
import Play from '@/components/Play.vue'
export default {

  components: {
    Play
  },
  data () {
    return {
    }
  },

  name: 'Footer'

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
