import axios from 'axios'
// let root = ''
import store from '@/store/index.js'
// import { Message } from 'element-ui'
const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://mana.sn9374.com:3000' : 'https://pl-fe.cn/cloud-music-api/'
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config.url.indexOf('/login'))

  // eslint-disable-next-line eqeqeq
  if (config.method == 'post') {
    // console.log('是登录接口')
    config.data = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000
    }
    if (store.state.user.cookie) {
      // console.log(store.state.cookie)
      config.data = {
        ...config.data,
        cookie: store.state.user.cookie
      }
    }
    // eslint-disable-next-line eqeqeq
  } else if (config.method == 'get') {
    // 是登录
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
    if (store.state.user.cookie) {
      // console.log(store.state.cookie)
      config.params = {
        ...config.params,
        cookie: store.state.user.cookie

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
  // 如果请求状态404，并且服务器返回false 为检测歌曲无版权,跳过一首歌曲，并进行提示
  // if (error.response.status === 404 && !error.response.data.success) {
  //   // console.log(error.response.data.success)
  //   Message.warning(error.response.data.message + '自动跳过一首')
  //   // console.log('改变id')
  //   // store.commit('play/dropOneSong')
  // }
  // if (errot.response)
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
