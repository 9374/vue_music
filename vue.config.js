const obj = {
  // import 时的包名称: window 全局的成员名称
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'element-ui': 'ELEMENT'
}
const { name } = require('./package');
module.exports = {
  // 以前想着用cdn加速 这些都不加载 后来cdn 总连不上 还是本地走吧
  // configureWebpack: {
  //   externals: process.env.NODE_ENV === "development" ? {} : obj
  // },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    open: true,
    port: 8080, // 重点6
    proxy: {
      // "/": {
      //   target: "https://pl-fe.cn/cloud-music-api",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/": "/"
      //   },
      //   rewrite: path => path.replace(/^\//, "") // 不可以省略rewrite
      // },
      "/vue": {
        target: "https://pl-fe.cn/cloud-music-api",
        changeOrigin: true,
        pathRewrite: {
          "^/vue": "/"
        },
        rewrite: path => path.replace(/^\//, "") // 不可以省略rewrite
      }
    },
    headers: {
      // 重点7：同重点1，允许子应用跨域
      "Access-Control-Allow-Origin": "*"
    }
    // https: true
  },
     lintOnSave: false,
  publicPath: "./",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].mode = process.env.NODE_ENV;
      console.log(args);
      return args;
    });
  },
  // 自定义webpack配置
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把子应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
};
