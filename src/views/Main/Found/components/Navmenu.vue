<template>
  <el-row type="flex" class="navbar">
    <el-col :span="24" :offset="0">
      <el-menu
        active-text-color="#ec4141"
        class="el-menu-demo"
        mode="horizontal"
        @select="changeSelect"
        router
        :default-active="activeIndex"
      >
        <!--          :default-active="activeIndex"      -->
        <el-menu-item index="/home"> 个性推荐 </el-menu-item>
        <el-menu-item index="/home/allSongsList">歌单 </el-menu-item>
        <el-menu-item index="/home/newmusiclist">最新音乐 </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      // 激活组件路径绑定
      // activeIndex: '/home'
    }
  },
  methods: {
    changeSelect (index) {
      console.log(this.$route)
      // console.log(index)
      this.activeIndex = index
    }
  },
  computed: {
    activeIndex: {
      get: function () {
        return this.$route.fullPath
      },
      set: function () { }
    }
  }
  // getters: {
  //   activeIndex
  // }
}
</script>

<style lang="less" scoped>
.navbar {
  z-index: 1;
  position: fixed;
  top: 60px;
  width: 100%;
  // left: 210px;
}
</style>
