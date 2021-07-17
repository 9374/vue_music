<template>
  <!-- <el-main class="main"> -->
  <div>
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

    }
  }

}

</script>

<style lang="less" scoped>
.threeview {
  margin-top: 10vh;
}

a {
  text-decoration: none;
}
</style>
