<template>
  <el-container>
    <el-header class="head">
      <el-popover
        ref="popover"
        placement="bottom-start"
        width="280"
        :title="searchlist.length === 0 ? '热门搜索' : ''"
        trigger="focus"
      >
        <div>
          <div v-if="searchlist.length === 0" class="hot_search">
            <ul class="hot_name_wrap">
              <li
                @click="addhot(item.first)"
                v-for="item in hotList"
                :key="item.first"
                class="hot_item"
              >
                {{ item.first }}
              </li>
            </ul>
          </div>
          <!-- 搜索结果 -->
          <div v-else class="hot_search">
            <div class="btn">
              <el-button type="info" size="mini" round>清空搜索列表</el-button>
              <el-button type="primary" size="mini" round>详细列表</el-button>
            </div>
            <p class="hot_title">搜索结果</p>
            <div v-for="item in searchlist" :key="item.id">
              <el-divider></el-divider>
              <SongItem
                :songName="item.name"
                :author="item.artists[0].name"
                :album="item.album.name"
                :id="item.id"
              />
            </div>
          </div>
        </div>
      </el-popover>
      <el-input
        v-popover:popover
        size="small"
        span="12"
        v-model="input"
        placeholder="搜索音乐"
        :style="{ width: '200px', borderRadius: '30px' }"
      ></el-input>

      <div serchlist></div>
    </el-header>
  </el-container>
</template>

<script>
import { searchApi, hotSearchNameApi } from '../api/search'
import SongItem from '../components/SongItem.vue'
export default {
  watch: {
    input (newval) {
      this.getSearch()
    }
  },
  data () {
    return {
      input: '',
      searchlist: [],
      timer: null,
      hotList: []
    }
  },
  components: {
    SongItem
  },
  methods: {
    getSearch () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const { data } = await searchApi(this.input)
        console.log(data)
        this.searchlist = data.result?.songs || []
      }, 600)
    },
    async getHotKeys () {
      const { data: { result: { hots } } } = await hotSearchNameApi()
      // console.log(hots)
      this.hotList = hots
    },
    addhot (hot) {
      this.input = hot
    }
  },
  created () {
    this.getHotKeys()
  }
}
</script>

<style lang='less' scoped>
.head {
  background-color: #ec4141;
  line-height: 60px;
}

.hot_title {
  font-size: 1rem;
  color: black;
  font-weight: 500;
}
.hot_name_wrap {
  margin: 0.266667rem 0;
}
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.513333rem;
  margin-bottom: 0.513333rem;
  padding: 0 0.573333rem;
  font-size: 0.973333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.btn {
  position: absolute;
  right: 10px;
}
</style>
