<template>
  <!-- 侧边栏 -->
  <el-aside class="aside" style="width: 250px; font-size: 14px">
    <el-menu :default-openeds="['1', '3']" router active-text-color="#ec4141">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-submenu index="2" :disabled="!isLogin">
        <template slot="title">
          <i class="el-icon-s-custom"></i>创建的歌单</template
        >
        <el-menu-item-group v-if="userCreatePlayList">
          <el-menu-item
            v-for="item in userCreatePlayList"
            :key="item.id"
            :index="'/home/songsList/' + item.id"
            >{{ item.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3" :disabled="!isLogin">
        <template slot="title">
          <i class="el-icon-star-on"></i>收藏的歌单</template
        >
        <el-menu-item-group v-if="userCollectionPlayList">
          <el-menu-item
            v-for="item in userCollectionPlayList"
            :key="item.id"
            :index="'/home/songsList/' + item.id"
            >{{ item.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  watch: {
    // 根据登录状态
    isLogin (newVal) {
      // 如果登录调用方法获取歌单
      if (newVal) {
        this.initUserPlayList(this.userInfo.userId)
      } else {
        // 否则清空歌单
        this.changeUserPlayList([])
      }
    },
    // 根据登录状态
    userInfo (newval) {
      if (newval) {
        this.initUserPlayList(this.userInfo.userId)
      } else {
        this.changeUserPlayList([])
      }
    }
  },
  methods: {
    ...mapActions('user', ['initUserPlayList', 'getUserLoveSong']),
    ...mapMutations('user', ['changeUserPlayList'])
    // 调用接口获取歌单

  },
  computed: {
    ...mapGetters('user', ['isLogin', 'userCreatePlayList', 'userCollectionPlayList']),
    ...mapState('user', ['userInfo'])
  },
  created () {
    // 页面加载自动加载歌单
    if (this.isLogin) {
      // console.log(this.isLogin)
      this.initUserPlayList(this.userInfo.userId)
      this.getUserLoveSong(this.userInfo.userId)
    }
  }
}
</script>

<style lang="less" scoped>
.aside {
  border-right: 1px solid #e6e6e6;
  .el-menu {
    border-right: none;
  }
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
<style lang='less'>
.el-submenu .el-menu-item {
  font-size: 14px;
  padding: 0 30px !important;
}
.el-menu-item-group ul {
  width: 100%;
  overflow: hidden;
}
/*-------滚动条整体样式----*/
::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}
/*滚动条里面小方块样式*/
::-webkit-scrollbar-thumb {
  border-radius: 100px;
  // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: linear-gradient(transparent, #ec4141, transparent);
  // background:#ec4141
  // background:#d4d4d4
  // background-image: ;
}
/*滚动条里面轨道样式*/
::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  // background: linear-gradient(#fff, transparent);
  background: rgba(0, 0, 0, 0.1);
}
</style>
