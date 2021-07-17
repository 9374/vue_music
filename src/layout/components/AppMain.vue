<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- 二级路由挂载点
      动态路由参数变化=》组件不刷新问题， ：key路由路径
       -->
      <!-- :key="key" -->
      <router-view />
    </transition>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>
