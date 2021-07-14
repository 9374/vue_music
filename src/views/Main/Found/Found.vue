<template>
  <div>
    <!--           @click.native="getSongsList(item.id)" -->
    <!-- 发现音乐组件 -->
    <p class="title">推荐歌单</p>
    <el-row type="flex" :gutter="40" align="top" justify="space-around">
      <el-col :span="4" v-for="item in list" :key="item.id" class="card">
        <el-card
          shadow="hover"
          :body-style="{ padding: '0px' }"
          @click.native="$router.push('/home/songsList/' + item.id)"
        >
          <el-image
            :lazy="true"
            class="image"
            :src="item.picUrl + '?param=300y300'"
            :fit="fits[2]"
          ></el-image>
          <div style="padding: 14px">
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.copywriter }}</time>
              <!-- <el-button type="text" class="button">操作按钮</el-button> -->
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetFound } from '@/api/mainapi.js'
// import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 图片显示模式
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      // 默认图片地址
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      // 歌单列表
      list: []
    }
  },
  watch: {
    isLogin (newval) {
      this.getFoundlist()
    }
  },
  created () {
    this.getFoundlist()
  },
  methods: {
    // ...mapMutations(['changeSeeSongsList']),
    // 获取发现音乐组件歌单列表 获取12个
    async getFoundlist () {
      const { data: { result } } = await GetFound(12)
      // console.log(result)
      this.list = result
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}

</script>

<style lang="less" scoped>
.title {
  padding: 0.266667rem 0.24rem;
  margin: 10px 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
.song_name {
  font-size: 20px;
  // padding: 0 0.08rem;
  overflow: hidden;
  text-overflow: ellipsis;
  // white-space: nowrap;
  /* 控制显示2行超出显示省略号 */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 行数 */
  -webkit-box-orient: vertical;
}
.el-row {
  margin-bottom: 20px;
  flex-wrap: wrap;
  &:last-child {
    margin-bottom: 0;
  }
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  max-height: 300px;
  max-width: 280px;
  margin-bottom: 20px;
}
.card {
  margin-bottom: 10px;
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
</style>
