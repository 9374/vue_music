import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import myconmponent from "@/components";
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  Vue.use(ElementUI);
}
Vue.use(myconmponent);
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

//  乾坤
// let instance = null // 乾坤
// 文档中将此代码单独放到了一个文件中，此处是直接写在了 main.js 中，两种都可。但是 eslint-disable 需要加上
// if (window.__POWERED_BY_QIANKUN__) {
//   // eslint-disable-next-line no-undef
//   __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
// }
// function render (props = {}) {
//   const { container } = props
//   // 文档中使用store，此处没有便删除了。
//   // 文档中的router对象是在此处创建的，但是在router文件夹的index.js中已经创建好了，所以稍加改造直接导入就好，下方贴了代码
//   instance = new Vue({
//     router,
//     store,
//     render: h => h(App)
//   }).$mount(container ? container.querySelector('#app') : '#app');
// }

// // 独立运行时 直接渲染
// if (!window.__POWERED_BY_QIANKUN__) {
//   render()
// }

// export async function bootstrap () {
//   console.log('[vue] vue app bootstraped')
// }

// export async function mount (props) {
//   console.log('[vue] props from main framework888', props)
//   render(props)
// }

// export async function unmount () {
//   instance.$destroy()
//   instance.$el.innerHTML = ''
//   instance = null
// }

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
