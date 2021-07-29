import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import myconmponent from '@/components'
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  Vue.use(ElementUI)
}
Vue.use(myconmponent)
// import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)

}).$mount('#app')
