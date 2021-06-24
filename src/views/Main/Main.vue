<template>
  <el-main class="main">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <router-link to="/">个性推荐</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/home/allSongsList">歌单</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/home/newmusiclist">最新音乐</router-link>
      </el-menu-item>
    </el-menu>

    <div class="line"></div>
    <router-view> </router-view>
  </el-main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeIndex: '1'
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
.main {
  position: absolute;
  left: 300px;
  right: 0px;
  top: 60px;
  bottom: 0px;
  padding-bottom: 60px;
}
a {
  text-decoration: none;
}
</style>
