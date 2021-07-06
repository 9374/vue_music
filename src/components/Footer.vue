<template>
  <el-footer class="footer" style="width: 100vw">
    <el-row>
      <el-col :span="20">
        <div class="song">
          <Play></Play>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="menu">
          <i
            @click="changeLoop()"
            :class="isLoop ? 'el-icon-refresh' : 'el-icon-refresh-right'"
            style="margin-right: 5px"
          ></i>

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
        <el-card class="box-card">
          <div slot="header" class="clearfix"></div>

          <template #header class="clearfix">
            <h3>正在播放</h3>
            <div class="info" style="display: flex">
              <div>
                <span style="clolor: #ccc">共{{ playList.length }}首</span>
              </div>
              <div class="btn">
                <el-button type="primary" round disabled
                  ><i class="el-icon-folder-add"></i> 收藏全部</el-button
                >
                <el-button type="info" round @click="clearPlayList()"
                  >清空列表</el-button
                >
              </div>
            </div>
          </template>
          <SongsTable :SongsList="playList" status="list" :btn="false" />
        </el-card>
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
    ...mapMutations(['changePlayId', 'clearPlayList', 'changeLoopState']),
    handleClose (done) {
      done()
    },
    changeLoop () {
      this.changeLoopState(!this.isLoop)
      this.$message({
        message: this.isLoop ? '切换为单曲循环' : '切换为列表循环',
        type: 'success'
      })
    }
  },
  computed: {
    ...mapState(['playList', 'isLoop'])
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
//
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// .box-card {
//   width: 480px;
// }
</style>
