<template>
  <div class="PlayInfoBox">
    <div class="songCover">
      <!-- <img :src="coverUrl" alt="" /> -->
      <el-image :src="coverUrl" fit="cover"></el-image>
    </div>
    <div class="songInfo">
      <div class="songname">{{ currentPlay.name }}</div>
      <div class="sonsAuthor" v-if="currentPlay.ar && currentPlay.ar.length">{{ currentPlay.ar[0].name }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'PlayInfo',
  computed: {
    ...mapGetters('play', ['coverUrl']),
    ...mapState('play', ['currentPlay'])
  },
  created () {
    console.log(this.currentPlay)
  }
}
</script>

<style lang="less" scoped>
.PlayInfoBox {
  align-items: center;
  display: flex;
  height: 60px;
  .songCover {
    width: 45px;
    height: 45px;
    border-radius: 7px;
    overflow: hidden;
    margin: 0 15px;
    .img {
      max-height: 100%;
      vertical-align: middle;
    }
  }
  .songInfo {
    .songname {
      font-size: 16px;
    }
    .sonsAuthor {
      font-size: 13px;
      color: #939393;
    }
  }
}
</style>
