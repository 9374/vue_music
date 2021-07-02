<template>
  <div>
    <!-- 精品歌单 -->
    <SongCart :list="AllSongslist" />
    <el-pagination
      :current-page="this.currentPage"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @next-click="nextpage"
      @current-change="currentchangepage"
      @prev-click="prevpage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { GetAllSongsListAPI } from '@/api/mainapi.js'
import SongCart from '@/components/SongsCart.vue'
export default {
  components: {
    SongCart
  },
  data () {
    return {
      // 所有音乐歌单的结果
      AllSongslist: [],
      // 每页个数;
      pageSize: 24,
      // 第几页
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    // 定义获取所有音乐结果的函数
    async getAllSongs () {
      const { data: res } = await GetAllSongsListAPI(this.pageSize, this.pageNumber)
      console.log(res)
      this.AllSongslist = res.playlists
      this.total = res.total
    },
    // 下一页
    nextpage (cur) {
      this.currentPage = cur
      this.getAllSongs()
    },
    // 直接点击页数
    currentchangepage (cur) {
      this.currentPage = cur
      this.getAllSongs()
    },
    // 点击上一页
    prevpage (cur) {
      this.currentPage = cur
      this.getAllSongs()
    }
  },
  // 创建页面时自动发送请求
  created () {
    this.getAllSongs()
  },
  // 计算属性（每页获取的数量）* （当前页数-1） = 当前页面的结果
  computed: {
    pageNumber () {
      return this.pageSize * (this.currentPage - 1)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
