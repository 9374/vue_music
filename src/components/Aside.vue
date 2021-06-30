<template>
  <!-- 侧边栏 -->
  <el-aside class="aside" style="width: 15vw">
    <el-menu :default-openeds="['1', '3']" router>
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-submenu index="2" disabled>
        <template slot="title">
          <i class="el-icon-s-custom"></i>创建的歌单</template
        >
        <el-menu-item-group>
          <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3" disabled>
        <template slot="title">
          <i class="el-icon-star-on"></i>收藏的歌单</template
        >
        <el-menu-item-group>
          <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.aside {
  margin-top: 10vh;
  // position: absolute;
  // // top: 60px;
  // top: 0px;
  // bottom: 0px;
  // left: 0px;
  padding-bottom: 10vh;
  border-right: 1px solid #e6e6e6;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
