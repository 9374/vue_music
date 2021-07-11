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
        playlist: []
      }
    }
  },
  watch: {
    isLogin (newVal) {
      if (newVal) {
        this.initUserPlayList()
      } else {
        this.userPlayList = {}
      }
    }
  },
  methods: {
    async initUserPlayList () {
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
    userCreatePlayList () {
      // console.log(this.userPlayList)
      if (this.userPlayList.playlist) {
        return this.userPlayList.playlist.filter(item => item.subscribed === false)
      } else {
        return []
      }
    },
    userCollectionPlayList () {
      if (this.userPlayList.playlist) {
        return this.userPlayList.playlist.filter(item => item.subscribed === true)
      } else {
        return ['']
      }
    }
  },
  created () {
    // console.log(this.isLogin)
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
