<template>
  <el-footer class="footer" style="width: 100vw">
    <el-row>
      <el-col :span="23">
        <div class="song">
          <Play></Play>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="menu">
          <i class="el-icon-s-fold" @click="drawer = !drawer"></i>
        </div>
      </el-col>
      <!-- show-close是否显示关闭按钮，modal：是否需要遮罩 size 宽度 append-to-body 添加到body， 是否显示，  打开放行  关闭回调-->
      <el-drawer
        :withHeader="false"
        :show-close="false"
        size="30%"
        :modal="false"
        :append-to-body="true"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
      >
        <SongsTable :SongsList="playList" status="list" :btn="false" />
      </el-drawer>
    </el-row>
  </el-footer>
</template>

<script>
import SongsTable from '@/components/SongsTable.vue'
import { mapMutations, mapState } from 'vuex'
import Play from '@/components/Play.vue'
export default {
  components: {
    Play,
    SongsTable
  },
  data () {
    return {
      drawer: false,
      direction: 'rtl'
    }
  },
  methods: {
    ...mapMutations(['changePlayId']),
    handleClose (done) {
      done()
    }
  },
  computed: {
    ...mapState(['playList'])
  },

  name: 'Footer'

}
</script>

<style lang="less" scoped>
.menu {
  display: flex;
  align-items: center;
  height: 10vh;
}
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
