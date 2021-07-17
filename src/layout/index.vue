<template>
  <div style="font-size: 14px">
    <header class="head"><Header /></header>
    <div class="main">
      <aside><Aside /></aside>
      <main><AppMain /></main>
    </div>
    <footer><Footer /></footer>
  </div>
</template>

<script>
import Aside from './components/Aside.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import AppMain from './components/AppMain.vue'
export default {
  components: {
    Aside,
    Header,
    AppMain,
    Footer
  }
}
</script>

<style lang="less" scoped>
.head {
  width: 100%;
  height: 60px;
  max-height: 10vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ec4141;
}
.main {
  padding-top: 60px;
  padding-bottom: 60px;
  display: flex;
  height: 80vh;
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    background-color: transparent;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: transparent;
  }
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #e1e1e1;
  }
  aside {
    border-right: none;
    height: 100%;
    width: 250px;
    overflow: scroll;
    background-color: #ddd;
  }
  main {
    background-color: #eee;
    flex: 1;
  }
}
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #ccc;
}
</style>
