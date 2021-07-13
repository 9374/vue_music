import axios from 'axios'
// let root = ''
import store from '@/store/index.js'
const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://mana.sn9374.com:3000' : 'https://pl-fe.cn/cloud-music-api/'
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config.url.indexOf('/login'))

  // eslint-disable-next-line eqeqeq
  if (config.method == 'post') {
    if (config.url.indexOf('/login') !== -1) {
      // console.log('是登录接口')
      config.data = {
        ...config.data,
        _t: Date.parse(new Date()) / 1000
      }
    }
    if (store.state.cookie) {
      // console.log(store.state.cookie)
      config.data = {
        ...config.data,
        cookie: store.state.cookie
      }
    }
    // eslint-disable-next-line eqeqeq
  } else if (config.method == 'get') {
    if (config.url.indexOf('/login') !== -1) {
      // 是登录
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    if (store.state.cookie) {
      // console.log(store.state.cookie)
      config.params = {
        ...config.params,
        cookie: store.state.cookie

      }
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
