<template>
  <div style="width: 100%">
    <template>
      <el-table :data="SongsList" stripe style="width: 100%">
        <el-table-column prop="name" label="音乐标题"> </el-table-column>
        <!-- 通过父组件川参判断是什么歌单类型 改变获取数据的路径 -->
        <el-table-column
          v-if="status === 'search'"
          prop="artists[0].name"
          label="歌手"
        >
        </el-table-column>
        <el-table-column
          v-if="status === 'new'"
          prop="song.artists[0].name"
          label="歌手"
        >
        </el-table-column>
        <el-table-column
          v-if="status === 'list'"
          prop="ar[0].name"
          label="歌手"
        >
        </el-table-column>
        <el-table-column
          v-if="status === 'search'"
          prop="album.name"
          label="专辑"
        >
        </el-table-column>
        <el-table-column
          v-if="status === 'new'"
          prop="song.album.name"
          label="专辑"
        >
        </el-table-column>
        <el-table-column v-if="status === 'list'" prop="al.name" label="专辑">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="{ row }">
            <el-button type="primary" @click="onPlay(row.id)" round>
              <i class="el-icon-video-play"></i>播放音乐
            </el-button>
            <el-button type="success" disabled round>添加到歌单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
    }

  },
  data () {
    return {
      // newarr: []
    }
  },
  methods: {
    // 从vuex中获取改变播放音乐id的方法
    ...mapMutations(['changePlayId']),
    // 点击改变播放音乐的id
    onPlay (palyid) {
      this.changePlayId(palyid)
    }
  }

}
</script>

<style lang="less" scoped>
.el-icon-video-play {
  margin-right: 7px;
}
</style>
