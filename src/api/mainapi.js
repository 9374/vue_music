import request from './request'
// import router from '@/router'
import store from '@/store'
// 获得推荐歌单
export const GetFound = function (num) {
  return request({
    url: '/personalized?limit=' + num,
    method: 'GET'
  })
}
// 获取歌单详情
export const GetSongsListAPI = function (id) {
  store.state.showSongslist = true
  // router.push('/home/songsList')
  return request({
    url: '/playlist/detail?id=' + id
  })
}
// 获取精品歌单
/* 歌单 ( 网友精选碟 )
说明 : 调用此接口 , 可获取网友精选碟歌单

可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'

cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)

limit: 取出歌单数量 , 默认为 50

offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值

接口地址 : /top/playlist

调用例子 : /top/playlist?limit=10&order=new */
// limit: 取出歌单数量, 默认为 50
export const GetAllSongsListAPI = function (limit, offset) {
  return request({
    url: '/top/playlist',
    params: {
      limit,
      offset
    }
  }
  )
}

// 获取最新音乐

export const GetnewSongAPI = function (limit) {
  return request({
    url: '/personalized/newsong',
    params: {
      limit
    }
  })
}

// 获取当前播放音乐的详情
export const getCurrentPlayAPI = function (ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}
// 获取歌词
export const getCurrentPlayLyricAPI = function (id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}
// 检测歌曲是否可用
export const getMusicStatusAPI = function (id) {
  return request({
    url: '/check/music',
    params: {
      id
    }
  })
}
export const subscribeSongListAPI = function (id, t) {
  return request({
    url: '/playlist/subscribe',
    params: {
      id,
      t
    }
  })
}
