import request from '@/api/request.js'
export const LoginStatus = function () {
  return request({
    url: '/login/refresh'
  })
}
/**
 * 通过手机登录接口
 * @param {*} params  params:{phone,password,countrycode,md5_password}
 * @returns
 */
// 通过手机登录
export const loginInPhone = function (params) {
  return request({
    url: '/login/cellphone',
    params
  })
}
/**
 * 通过邮箱登录接口
 * @param {*} params  params:{email,password,md5_password}
 * @returns
 */
export const loginInEmail = function (params) {
  return request({
    url: '/login',
    params
  })
}

/**
 * 通过二维码登录接口
 */
// 请求一个key
export const loginCreateKey = function () {
  return request({
    url: '/login/qr/key'
  })
}
/**
 *
 * @param {*} param0  key第一个接口生成的key qrimg,会返回二维码的base64
 * @returns
 */
// 通过生成的key 生成二维码
export const loginInitQr = function ({ key, qrimg }) {
  return request({
    url: '/login/qr/create',
    params: {
      key,
      qrimg
    }
  })
}

// 检测二维码状态
export const confirmQrStatus = function (key) {
  return request({
    url: '/login/qr/check',
    params: {
      key
    }
  })
}

// 刷新登录状态
export const loginRefresh = function () {
  return request({
    url: '/login/refresh'
  })
}

// 检测登录状态
export const loginStatus = function () {
  return request({
    url: '/login/status'
  })
}

// 获取用户详情
export const userDetail = function (uid) {
  return request({
    url: '/user/detail',
    params: {
      uid
    }
  })
}

// 获取用户歌单
export const userPlaylistAPI = function (uid) {
  return request({
    url: '/user/playlist',
    params: {
      uid
    }
  })
}
// 签到
export const userSigninAPI = function () {
  return request({
    url: '/daily_signin'
  })
}
export const userLoginOut = function () {
  return request({
    url: '/logout'
  })
}
