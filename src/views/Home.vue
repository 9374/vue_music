<template>
  <div id="app">
    <Header />
    <el-container>
      <Aside> </Aside>
      <el-main class="main"> <router-view /></el-main>
    </el-container>
    <Footer />
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
* {
  margin: 0;
  padding: 0;
}
</style>
