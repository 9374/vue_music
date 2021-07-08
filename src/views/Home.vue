<template>
  <div id="app">
    <el-container style="height: 100vh">
      <Header />
      <el-container>
        <Aside> </Aside>
        <el-main class="view" style="padding: 5px 20px">
          <keep-alive> <router-view class="main"></router-view></keep-alive>
        </el-main>
      </el-container>
      <Footer />
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Aside from '@/components/Aside.vue'
// import Main from './views/Main.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Header,
    Aside,
    Footer
  },
  data () {
    return {
      view: 'songs',
      full: false
    }
  }
}
</script>
<style lang="less">
.view {
  max-height: 82vh;
  width: 85vw;
  position: absolute;
  top: 10vh;
  left: 15vw;
}

* {
  margin: 0;
  padding: 0;
}
</style>
