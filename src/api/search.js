import request from './request'
// 获取搜索结果  关键字，获取数量 偏移值
export const searchApi = function (keywords, limit, offset) {
  return request({
    url: '/search',
    params: {
      keywords, limit, offset
    }
  })
}
// 获取热词
export const hotSearchNameApi = () => request({
  url: '/search/hot'
})
