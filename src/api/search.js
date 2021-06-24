import request from './request'
export const searchApi = function (keywords) {
  return request({
    url: '/search',
    params: {
      keywords,
      limit: 5
    }
  })
}
export const hotSearchNameApi = () => request({
  url: '/search/hot'
})
