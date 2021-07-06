import axios from 'axios'
// let root = ''

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://mana.sn9374.com:3000' : 'https://pl-fe.cn/cloud-music-api/'
})
export default request
