<template>
  <!-- 侧边栏 -->
  <el-aside class="aside" style="width: 15vw">
    <el-menu :default-openeds="['1', '3']" router>
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-submenu index="2" :disabled="!isLogin">
        <template slot="title">
          <i class="el-icon-s-custom"></i>创建的歌单</template
        >
        <el-menu-item-group>
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
        <el-menu-item-group>
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
import { mapState, mapGetters } from 'vuex'
import { userPlaylistAPI } from '@/api/userAPI.js'
export default {
  data () {
    return {
      userPlayList: {
        // 获取用户的歌单
        playlist: []
      }
    }
  },
  watch: {
    // 根据登录状态
    isLogin (newVal) {
      // 如果登录调用方法获取歌单
      if (newVal) {
        this.initUserPlayList()
      } else {
        // 否则清空歌单
        this.userPlayList = {}
      }
    },
    // 根据登录状态
    userInfo (newval) {
      if (newval) {
        this.initUserPlayList()
      } else {
        this.userPlayList = {}
      }
    }
  },
  methods: {
    // 调用接口获取歌单
    async initUserPlayList () {
      // console.log('获取收藏列表')
      // 如果是登录状态获取用户歌单
      if (this.isLogin) {
        const res = await userPlaylistAPI(this.userInfo.userId)
        // console.log(res)
        if (res.status === 200) {
          // console.log('接受', res.data)
          this.userPlayList = res.data
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState(['userInfo']),
    // 用户创建的歌单
    userCreatePlayList () {
      // console.log(this.userPlayList)
      if (this.userPlayList.playlist) {
        return this.userPlayList.playlist.filter(item => item.subscribed === false)
      } else {
        return []
      }
    },
    // 用户收藏的歌单
    userCollectionPlayList () {
      if (this.userPlayList.playlist) {
        return this.userPlayList.playlist.filter(item => item.subscribed === true)
      } else {
        return ['']
      }
    }
  },
  created () {
    // 页面加载自动加载歌单
    this.initUserPlayList()
  }
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
