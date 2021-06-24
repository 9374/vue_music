<template>
  <div class="song_item_wrap">
    <div class="song_left">
      <h3>{{ songName }}</h3>
      <p>
        <span>{{ author }} - </span><span>{{ album }}</span>
      </p>
    </div>
    <div class="song_right">
      <i class="el-icon-caret-right"></i>
    </div>
  </div>
</template>

<script>
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

  }
}

</script>

<style lang="less" scoped>
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
