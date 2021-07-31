<template>
  <div style="width: 100%">
    <el-table
      style="font-size: 14px"
      @row-dblclick="onPlaylistClick"
      :data="SongsList"
      stripe
      :row-class-name="tableRowClassName"
    >
      <!--  -->
      <el-table-column width="34px">
        <template #default="{ row }">
          <IsPlayIcon :id="row.id" />
          <IsLike :id="row.id"> </IsLike>
        </template>
      </el-table-column>
      <el-table-column prop="name" min-width="200" label="音乐标题">
      </el-table-column>
      <!-- 通过父组件川参判断是什么歌单类型 改变获取数据的路径 -->
      <el-table-column
        width="100px"
        v-if="status === 'search'"
        prop="artists[0].name"
        label="歌手"
      >
      </el-table-column>
      <el-table-column
        width="100px"
        v-if="status === 'new'"
        prop="song.artists[0].name"
        label="歌手"
      >
      </el-table-column>
      <el-table-column
        width="100px"
        v-if="status === 'list'"
        prop="ar[0].name"
        label="歌手"
      >
      </el-table-column>
      <el-table-column
        min-width="200px"
        v-if="status === 'search' && btn"
        prop="album.name"
        label="专辑"
      >
      </el-table-column>
      <el-table-column
        min-width="200px"
        v-if="status === 'new' && btn"
        prop="song.album.name"
        label="专辑"
      >
      </el-table-column>
      <el-table-column
        min-width="200px"
        v-if="status === 'list' && btn"
        prop="al.name"
        label="专辑"
      >
      </el-table-column>
      <el-table-column v-if="btn" label="操作" width="300px">
        <template #default="{ row }">
          <el-button type="primary" @click="onPlay(row.id)" round>
            <i class="el-icon-video-play"></i>播放
          </el-button>
          <el-button type="info" @click="addToList(row.id)" round
            >添加到列表</el-button
          >
        </template>
      </el-table-column>
      <el-table-column v-if="!btn" width="40">
        <template #default="{ row }">
          <DeleteIcon :id="row.id" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
//  复用歌曲表格组件
export default {
  // 需要引用者传入songslist歌单列表
  props: {
    SongsList: {
      type: Array,
      required: true,
      default: () => []
    },
    // 父组件传入歌单类型，从而获取不同歌单类型的信息
    status: {
      type: String,
      required: true
    },
    btn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // newarr: []
    }
  },
  methods: {
    ...mapActions('play', ['getCurrentPlay', 'addToList']),
    // 从vuex中获取改变播放音乐id的方法
    ...mapMutations('play', ['changePlayId', 'addPlayList']),
    // 点击改变播放音乐的id
    // 播放
    onPlay (playid) {
      console.log('我要播放', playid)
      this.changePlayId(playid)
    },
    // 双击事件
    onPlaylistClick (row, column, event) {
      // console.log(row, column, event)
      this.changePlayId(row.id)
    },
    // 当前播放的音乐样式
    tableRowClassName ({ row, rowIndex }) {
      // console.log(row, rowIndex)
      if (row.id === this.nowPlay.playId) {
        return 'success-row'
      } else {
        return ''
      }
    }
  },
  computed: {
    ...mapState('play', ['nowPlay', 'playList'])
  }
}
</script>

<style lang="less" scoped>
.playing {
  display: block;
}
.el-icon-video-play {
  margin-right: 7px;
}
.el-table .warning-row {
  background: oldlace;
}

/deep/ .el-table .success-row {
  color: #ec4141;
  // background: #f0f9eb;
}
</style>
