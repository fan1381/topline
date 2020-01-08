import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login', // 建议给每个路由起个名字
  component: () =>
        import ('@/views/login/login.vue')
}]

const router = new VueRouter({
  routes
})

export default router
