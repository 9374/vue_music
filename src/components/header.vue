<template>
  <el-header class="head" style="width: 100vw">
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
            <el-button type="info" size="mini" round @click="delResult"
              >清空搜索列表</el-button
            >
            <el-button
              @click="$router.push('/home/searchList/' + input)"
              type="primary"
              size="mini"
              round
              >详细列表
              <!-- <router-link to="/">详细列表</router-link> -->
            </el-button>
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
</template>

<script>
// 获取搜索接口
import { searchApi, hotSearchNameApi } from '../api/search'
//  引入预览列表组件
import SongItem from '../components/SongItem.vue'
export default {
  watch: {
    // 输入框值改变后调用获取搜索结果;
    input (newval) {
      this.getSearch()
    }
  },
  data () {
    return {
      // 输入框双向绑定的值
      input: '',
      // 搜索结果储存
      searchlist: [],
      // 延时器id 用来节流
      timer: null,
      // 热词列表
      hotList: []
    }
  },
  // 引入搜索预览组件
  components: {
    SongItem
  },
  methods: {
    // 当用户停止输入后获取五个搜索结果储存展示
    getSearch () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // 如果结果为空不发送请求
        if (this.input.length === 0) {
          return
        }
        const { data } = await searchApi(this.input, 5)
        console.log(data)
        this.searchlist = data.result?.songs || []
      }, 500)
    },
    // 获取热门搜索热词储存在本地
    async getHotKeys () {
      const { data: { result: { hots } } } = await hotSearchNameApi()
      // console.log(hots)
      this.hotList = hots
    },
    // 点击热门搜索改变输入框内的值
    addhot (hot) {
      this.input = hot
    },
    // 删除搜索结果
    delResult () {
      this.input = ''
      this.searchlist = []
    }

  },
  created () {
    // 页面加载时自动搜索热词
    this.getHotKeys()
  }
}
</script>

<style lang='less' scoped>
.head {
  height: 10vh;
  background-color: #ec4141;
  line-height: 10vh;
  position: fixed;
  top: 0;
  left: 0;
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
  a {
    text-decoration: none;
    color: #fff;
  }
}
</style>
