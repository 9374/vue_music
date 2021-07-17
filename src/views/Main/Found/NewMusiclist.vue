<template>
  <div>
    <NavMenu />
    <!-- <p class="title">最新音乐</p> -->
    <div style="padding-top: 60px">
      <SongsTable status="new" :SongsList="SongList" />
    </div>
  </div>
</template>

<script>
import NavMenu from './components/Navmenu.vue'
import { GetnewSongAPI } from '@/api/mainapi.js'
import SongsTable from '@/components/SongsTable.vue'
export default {
  components: {
    SongsTable,
    NavMenu
  },
  data () {
    return {
      // 获得的歌曲列表
      SongList: []
    }
  },
  methods: {
    // 获取最新音乐
    async getNewSong () {
      const { data: res } = await GetnewSongAPI(30)
      if (res.code === 200) {
        console.log('最新音乐获取成功')
        this.SongList = res.result
      }
    }
  },
  created () {
    // 页面加载获取最新音乐
    this.getNewSong()
  }
}
</script>

<style lang="less" scoped>
</style>
