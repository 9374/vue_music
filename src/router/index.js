import Vue from 'vue'
import VueRouter from 'vue-router'
import Songs from '@/views/songs.vue'
import Main from '@/views/Main/Main.vue'
import Found from '@/views/Main/Found/Found.vue'
import SongsList from '@/views/Main/SongsList.vue'
import Home from '@/views/Home.vue'
import AllSongsList from '@/views/Main/Found/AllSongsLust.vue'
import NewMusiclist from '@/views/Main/Found/NewMusiclist.vue'
import SearchList from '@/views/Main/Found/SearchList/SearchList.vue'
// import test from '@/views/test.vue'
Vue.use(VueRouter)

const routes = [
  // 重定向至首页
  {
    path: '/',
    redirect: '/home'
  },
  // 首页
  {
    path: '/home',
    component: Home,
    children: [
      // 默认选中main
      {
        path: '',
        component: Main,
        children: [
          // 推荐/发现音乐
          { path: '', component: Found, name: 'found' },
          // 歌单
          { path: 'allSongsList', component: AllSongsList, name: 'allSongsList' },
          // 最新音乐
          { path: 'newmusiclist', component: NewMusiclist, name: 'newmusiclist' }
        ]
      },
      { path: 'songsList/:id', component: SongsList, name: 'songslist', props: true },
      { path: 'searchList/:kw', component: SearchList, name: 'searchlist', props: true }
      // { path: 'test/:id', component: test, name: 'test', props: true }
      // { path: 'songs/:id', component: SongsList, name: 'songs', props: true }
    ]

  },
  // 正在播放
  {
    path: '/songs',
    component: Songs
  }

]

const router = new VueRouter({
  routes
})

export default router
