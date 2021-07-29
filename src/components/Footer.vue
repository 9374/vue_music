<template>
  <el-footer class="footer" style="z-index: 1001; width: 100vw; padding: 0">
    <el-row>
      <el-col v-show="!playDetail" :span="5">
        <Play />
      </el-col>
      <el-col v-show="playDetail" :span="5">
        <PlayInfo />
      </el-col>
      <el-col v-if="!playDetail" :span="15">
        <LyricFooter />
      </el-col>
      <el-col v-else :span="15" style="display: flex; justify-content: center">
        <Playcontrol />
      </el-col>
      <el-col :span="4">
        <div class="menu">
          <IsLike :state="true" :id="playId" style="margin-right: 5px">
          </IsLike>
          <IsLoop />
          <i class="el-icon-s-fold" @click="drawer = !drawer"></i>
        </div>
      </el-col>
      <!-- show-close是否显示关闭按钮，modal：是否需要遮罩 size 宽度 append-to-body 添加到body， 是否显示，  打开放行  关闭回调-->
    </el-row>
    <el-drawer
      style="padding-bottom: 60px"
      :withHeader="false"
      :show-close="false"
      size="40%"
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
              <el-button type="info" round @click="clearPlayList1()"
                >清空列表</el-button
              >
            </div>
          </div>
        </template>
        <SongsTable :SongsList="playList" status="list" :btn="false" />
      </el-card>
    </el-drawer>
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
    ...mapMutations('play', ['changePlayId', 'clearPlayList']),
    clearPlayList1 () {
      this.$confirm('确认清空播放列表吗？', '提示').then(() => {
        this.clearPlayList()
      }).catch(console.log)
    },
    handleClose (done) {
      done()
    }

  },
  computed: {
    ...mapState('play', ['playList', 'playId', 'playDetail'])
  },
  name: 'Footer'
}
</script>

<style lang="less" scoped>
.menu {
  justify-content: center;
  display: flex;
  align-items: center;
  height: 60px;
}
.footer {
  background-color: #fff;
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
