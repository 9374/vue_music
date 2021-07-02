<template>
  <!-- <el-main class="main"> -->
  <div>
    <el-menu
      style="width: 100%"
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

    <!-- <div class="line"></div> -->
    <!-- 开启组件缓存 -->
    <keep-alive>
      <router-view class="threeview"> </router-view>
    </keep-alive>
  </div>
  <!-- </el-main> -->
</template>

<script>
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 激活组件路径绑定
      activeIndex: '/home'
      // activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
  // computed: {
  //   ...mapState(['showSongslist'])
  // }
}

</script>

<style lang="less" scoped>
.threeview {
  margin-top: 10vh;
}
.el-menu-demo {
  z-index: 1;
  position: fixed;
  top: 10vh;
  left: 15vw;
}
a {
  text-decoration: none;
}
</style>
