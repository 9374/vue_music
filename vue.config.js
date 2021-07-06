const obj = {
  // import 时的包名称: window 全局的成员名称
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'element-ui': 'ELEMENT'
}
module.exports = {
  configureWebpack: {
    externals: process.env.NODE_ENV === 'development' ? {} : obj
  },
  publicPath: './',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      console.log(args)
      args[0].mode = process.env.NODE_ENV
      return args
    })
  }
}
