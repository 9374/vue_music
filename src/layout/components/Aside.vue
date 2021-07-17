<template>
  <!-- 侧边栏 -->
  <div style="height: 100%">
    <el-menu :default-openeds="['1', '3']" router active-text-color="#ec4141">
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
            class="menuSongList"
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
            style="padding: 0 20px"
            v-for="item in userCollectionPlayList"
            :key="item.id"
            :index="'/home/songsList/' + item.id"
            >{{ item.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
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
    ...mapGetters('user', ['isLogin']),
    ...mapState('user', ['userInfo']),
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

<style lang="less" scoped >
/deep/.el-menu-item li {
  margin-left: 10px;
  height: 20px;
  line-height: 20px;
  padding: 0px 20px;
  // color: #999;
  font-size: 13px;
  cursor: pointer; /*鼠标放上变小手*/
  text-overflow: ellipsis; /*当对象内文本溢出时显示省略标记(...)；需与overflow:hidden;一起使用。*/
}
/deep/.el-menu-item-group ul {
  word-break: keep-all; /*不换行*/
  white-space: nowrap; /*不换行*/
  overflow: hidden; /*内容超出宽度时隐藏超出部分的内容*/
  text-overflow: ellipsis; /*当对象内文本溢出时显示省略标记(...)；需与overflow:hidden;一起使用。*/
}
</style>
