import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/register-vant' // 注册vant标签
import './styles/index.less'
import 'amfe-flexible' // 动态设置rem基准值（html标签字体大小）
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
