<template>
  <div>
    <i
      @click="likeSong(id)"
      v-show="id !== playId || state"
      :class="isLike ? 'el-icon-star-on' : 'el-icon-star-off'"
    >
    </i>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { likeSongApi } from '@/api/userAPI.js'
export default {
  name: 'IsLike',
  props: {
    id: {
      type: Number,
      require: true
    },
    state: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions('user', ['getUserLoveSong']),
    likeSong (id) {
      if (this.isLogin) {
        if (this.isLike) {
          this.$confirm('确定取消喜欢吗？', '提示').then(async () => {
            const res = await likeSongApi(id, false)
            console.log(res)
            if (res.data.code === 200) {
              this.$message.success('取消喜欢成功')
              this.getUserLoveSong()
            }
          }).catch(console.log)
        } else {
          this.$confirm('确定添加至喜欢吗？', '提示').then(async () => {
            const res = await likeSongApi(id, true)
            console.log(res)
            if (res.data.code === 200) {
              this.$message.success('喜欢成功')
              this.getUserLoveSong()
            }
          }).catch(console.log)
        }
      } else {
        this.$message.warning('请先登录帐号才可以喜欢歌曲')
      }
    }
  },
  computed: {
    ...mapGetters('user', ['isLogin']),
    ...mapState('play', ['playId', 'isPlaying']),
    ...mapState('user', ['userPlayList']),
    isLike () {
      // if (this.userPlayList.userLikeSongList.some(item => id === item)) {
      //   return 'el-icon-star-on'
      // } else {
      //   return 'el-icon-star-off'
      // }
      return this.userPlayList.userLikeSongList.some(item => this.id === item)
    }
  },
  created () {
    // console.log(this.id)
  }
}
</script>

<style lang="scss" scoped>
</style>
