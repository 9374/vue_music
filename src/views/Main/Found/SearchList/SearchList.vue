<template>
  <!-- <el-main class="main"> -->
  <div>
    <h3>找到{{ totalcount }}首单曲</h3>
    <!-- <h3>找到位歌手</h3> -->
    <!-- <template>
      <el-table :data="searchlist" stripe style="width: 100%">
        <el-table-column width="50"> </el-table-column>
        <el-table-column prop="name" label="音乐标题"> </el-table-column>
        <el-table-column prop="artists[0].name" label="歌手"> </el-table-column>
        <el-table-column prop="album.name" label="专辑"> </el-table-column>
        <el-table-column label="操作" width="300">
          <el-button type="primary" disabled round>播放音乐 </el-button>
          <el-button type="success" disabled round>添加到歌单</el-button>
        </el-table-column>
      </el-table>
    </template> -->
    <SongsTable status="search" :SongsList="searchlist" />
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalcount"
      @current-change="currentchangepage"
      @prev-click="prevpage"
      @next-click="nextpage"
    >
    </el-pagination>
  </div>
  <!-- </el-main> -->
</template>

<script>
import SongsTable from '@/components/SongsTable.vue'
import { searchApi } from '@/api/search'

// import SongsTable from '@/components/SongsTable.vue'
export default {
  components: {
    SongsTable
  },
  watch: {
    kw () {
      this.getSearch()
    }
  },
  // 搜索关键词
  props: ['kw'],
  data () {
    return {
      // 搜索结果储存列表
      searchlist: [],
      // 搜索结果总数
      totalcount: 0,
      // 当前页数
      currentPage: 1,
      // 每页搜索的数量
      limit: 30
    }
  },
  methods: {
    // 定义搜索执行的函数
    async getSearch () {
      const { data } = await searchApi(this.kw, this.limit, this.offset)
      // 如果搜索成功
      if (data.code === 200) {
        // console.log(data)
        // console.log(data.result?.songs)
        // console.log(data.result.songCount)
        // 给搜索结果列表赋值
        this.searchlist = data.result?.songs || []
        // 给搜索总数赋值
        this.totalcount = data.result.songCount
      }
    },
    // 当点击下一页时 改变当前页数重新发送请求
    nextpage (cur) {
      this.currentPage = cur
      this.getSearch()
    },
    // 直接点击页数时，改变页数，发送请求
    currentchangepage (cur) {
      this.currentPage = cur
      this.getSearch()
    },
    // 点击上一页，改变页数发送请求
    prevpage (cur) {
      this.currentPage = cur
      this.getSearch()
    }
  },
  // 进入搜索结果页时自动发送获取结果
  created () {
    this.getSearch()
  },
  // 计算属性
  computed: {
    // 计算偏移值，用来给接口调用获取 （每页获取的数量）* （当前页数-1） = 当前页面的结果
    offset () {
      return this.limit * (this.currentPage - 1)
    }

  }
}
</script>

<style lang="less" scoped>
// .main {
//   position: absolute;
//   left: 300px;
//   right: 0px;
//   top: 60px;
//   bottom: 0px;
//   padding-bottom: 60px;
// }
</style>
