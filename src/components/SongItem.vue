<template>
  <div class="song_item_wrap">
    <div class="song_left">
      <h3>{{ songName }}</h3>
      <p>
        <span>{{ author }} - </span><span>{{ album }}</span>
      </p>
    </div>
    <div class="song_right">
      <!-- <i class="el-icon-caret-right"></i> -->
      <el-button type="primary" @click="onPlay(id)" round
        ><i class="el-icon-video-play"></i> 播放音乐</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  props: {
    // 歌名
    songName: {
      type: String,
      default: ''
    },
    // 作者
    author: {
      type: String,
      default: ''
    },
    // 专辑
    album: {
      type: String
    },
    id: {
      type: Number
    }
  },
  methods: {
    // 从vuex中获取改变正在播放的音乐id的方法
    ...mapMutations(['changePlayId']),
    ...mapActions(['getCurrentPlay', 'getCurrentPlayLyric']),
    // 调用方法改变正在播放的歌曲
    onPlay (playid) {
      this.changePlayId(playid)
      this.getCurrentPlay(playid)
      this.getCurrentPlayLyric(playid)
    }
  }
}

</script>

<style lang="less" scoped>
.el-icon-video-play {
  margin-right: 7px;
}
/*歌单样式*/
.song_item_wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 歌曲列表 */
.song_right {
  padding-right: 0.266667rem;
  line-height: 1.066667rem;
}

/* 歌曲_名字 */
.song_left {
  width: 8rem;
}
.song_left p:first-child {
  font-size: 0.453333rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song_left p:last-child {
  font-size: 0.32rem;
  color: #888;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 播放图标 */
.song_right i {
  display: inline-block;
  transform: scale(1.3);
}
/* end */
</style>
