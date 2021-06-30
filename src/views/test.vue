<template>
  <el-main class="main">
    <div>test{{ id }}</div>
  </el-main>
</template>

<script>
export default {
  props: ['id']
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
