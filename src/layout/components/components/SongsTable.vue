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
          <i
            v-show="row.id === playId"
            :class="isPlaying ? 'el-icon-loading' : 'el-icon-caret-right'"
          >
          </i>
          <!-- <p>{{ row }}</p> -->
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
          <el-button type="success" @click="addToList(row.id)" round
            >添加到列表</el-button
          >
        </template>
      </el-table-column>
      <el-table-column v-if="!btn" width="40">
        <template #default="{ row }">
          <i class="el-icon-delete" @click.stop="delOneSong(row.id)"></i>
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
    ...mapMutations('play', ['changePlayId', 'addPlayList', 'delOneSong']),
    // 点击改变播放音乐的id
    // 播放
    onPlay (playid) {
      console.log('我要播放', playid)
      this.changePlayId(playid)
    },
    onPlaylistClick (row, column, event) {
      // console.log(row, column, event)
      this.changePlayId(row.id)
    },
    tableRowClassName ({ row, rowIndex }) {
      // console.log(row, rowIndex)
      // console.log(this.playId, row.id)
      if (row.id === this.playId) {
        return 'success-row'
      } else {
        return ''
      }
    }
  },
  computed: {
    ...mapState('play', ['playId', 'playList', 'isPlaying'])
    // currentRow () {
    //   this.playList.forEach((item, i) => {
    //     if (item.id === this.playId) {
    //       return i
    //     }
    //   })
    //   return 0
    // }
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
