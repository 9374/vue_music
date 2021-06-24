import Vue from 'vue'
import VueRouter from 'vue-router'

import Songs from '@/views/songs.vue'
import Main from '@/views/Main/Main.vue'
import Found from '../views/Main/Found/Found.vue'
import SongsList from '@/views/Main/SongsList.vue'
import Home from '../views/Home.vue'
import AllSongsList from '@/views/Main/Found/AllSongsLust.vue'
import NewMusiclist from '@/views/Main/Found/NewMusiclist.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        component: Main,
        name: 'main',
        children: [
          { path: '', component: Found, name: 'found' },
          { path: 'allSongsList', component: AllSongsList, name: 'allSongsList' },
          { path: 'newmusiclist', component: NewMusiclist, name: 'newmusiclist' }
        ]
      },
      { path: 'songsList', component: SongsList, name: 'songslist' }
    ]

  },
  {
    path: '/songs',
    component: Songs
  }

]

const router = new VueRouter({
  routes
})

export default router
