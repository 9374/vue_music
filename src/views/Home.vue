<template>
  <div id="app">
    <el-container style="height: 100vh">
      <Header />
      <el-container style="padding: 60px 0px; overflow: hidden">
        <Aside> </Aside>
        <el-main class="view" style="padding: 5px 20px">
          <router-view class="main"></router-view>
        </el-main>
      </el-container>
      <Footer />
      <MusicDetailCard />
    </el-container>
  </div>
</template>

<script>
import MusicDetailCard from '@/views/musicDetailCard/MusicDetailCard.vue'
import Header from '@/components/header.vue'
import Aside from '@/components/Aside.vue'
// import Main from './views/Main.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Header,
    Aside,
    Footer,
    MusicDetailCard

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
.el-button--primary {
  background-color: #ec4141;
  border-color: #ec4141;
}
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #ec4141;
  border-color: #ec4141;
}

* {
  margin: 0;
  padding: 0;
}
</style>
