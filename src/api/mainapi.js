import request from './request'
import router from '@/router'
import store from '@/store'
// 获得推荐歌单
export const GetFound = function () {
  return request({
    url: '/personalized?limit=8',
    method: 'GET'
  })
}
// 获取歌单详情
export const GetSongsListAPI = function (id) {
  store.state.showSongslist = true
  router.push('/home/songsList')
  return request({
    url: '/playlist/detail?id=' + id
  })
}
