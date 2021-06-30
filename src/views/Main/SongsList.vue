<template>
  <!-- <el-main > -->
  <div v-if="seeSongsList !== null" class="main">
    <div class="head">
      <div class="pic"><img :src="seeSongsList.coverImgUrl" alt="" /></div>
      <div class="info">
        <h3>{{ seeSongsList.name }}</h3>
        <div class="user">
          <el-avatar :src="seeSongsList.creator.avatarUrl"></el-avatar>
          <p>{{ seeSongsList.creator.nickname }}</p>
        </div>

        <p>
          标签:
          <el-tag
            class="tags"
            v-for="(item, i) in seeSongsList.tags"
            :key="i"
            >{{ item }}</el-tag
          >
        </p>
        <p class="description">简介:{{ seeSongsList.description }}</p>
        <div class="btn">
          <el-button type="primary" disabled round>播放全部(未)</el-button>
          <el-button type="primary" disabled round>收藏(未)</el-button>
        </div>
      </div>
    </div>
    <p class="title">歌曲列表</p>
    <!-- 通过作用域插槽，获取row数据，实现一些功能（编辑，拿到id跳转数据详情页；格式化数据） -->
    <!-- <template>
      <el-table :data="seeSongsList.tracks" stripe style="width: 100%">
        <el-table-column prop="" width="50"> </el-table-column>
        <el-table-column prop="name" label="音乐标题"> </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手"> </el-table-column>
        <el-table-column prop="al.name" label="专辑"> </el-table-column>
        <el-table-column prop="date" label="操作" width="300">
          <template #default="{ row }">
            <el-button type="primary" @click="onPlay(row.id)" round
              >播放音乐{{ row.id }}
            </el-button>
            <el-button type="success" disabled round>添加到歌单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template> -->
    <SongsTable status="list" :SongsList="seeSongsList.tracks" />
  </div>
  <!-- </el-main> -->
</template>

<script>
import SongsTable from '@/components/SongsTable.vue'
import { mapMutations } from 'vuex'
import { GetSongsListAPI } from '@/api/mainapi'
export default {
  watch: {
    id () {
      this.seeSongsList = null
      this.getSongsList()
    }
  },
  // 获取歌单信息
  created () {
    // console.log(this.id)
    this.getSongsList()
  },
  data () {
    return {
      //  保存歌单列表
      seeSongsList: null
    }
  },
  props: ['id'],
  methods: {
    ...mapMutations(['changePlayId']),
    // 获取歌单列表的函数
    async getSongsList () {
      const { data: res } = await GetSongsListAPI(this.id)
      // console.log(res)
      if (res.code === 200) {
        // console.log(res)
        this.seeSongsList = res.playlist
        // console.log(this.seeSongsList)
      }
    },
    onPlay (palyid) {
      this.changePlayId(palyid)
    }

  },
  components: {
    SongsTable
  }
  // 页面加载自动获取歌单信息

}
</script>

<style lang="less" scoped>
.box {
  float: right;
}
// .main {
//   padding: 0 30px;
//   position: absolute;
//   left: 300px;
//   right: 0px;
//   top: 60px;
//   bottom: 0px;
//   padding-bottom: 60px;
// }
.title {
  padding: 0.266667rem 0.24rem;
  margin: 10px 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.head {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  .pic {
    margin-right: 20px;
    img {
      width: 200px;
    }
  }
  .info {
    flex: 1;
    .user {
      margin-top: 10px;
      display: flex;
      align-items: center;
      p {
        margin-left: 20px;
      }
    }
  }
  .btn {
    margin-top: 10px;
  }
  .tags {
    margin-right: 10px;
  }
  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>
