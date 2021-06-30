<template>
  <!-- <el-main class="main"> -->
  <div>
    <el-menu
      router
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/home"> 个性推荐 </el-menu-item>
      <el-menu-item index="/home/allSongsList">歌单 </el-menu-item>
      <el-menu-item index="/home/newmusiclist">最新音乐 </el-menu-item>
    </el-menu>

    <div class="line"></div>
    <keep-alive>
      <router-view> </router-view>
    </keep-alive>
  </div>
  <!-- </el-main> -->
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeIndex: '/home'
      // activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    ...mapState(['showSongslist'])
  }
}

</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
</style>
