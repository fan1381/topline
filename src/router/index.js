import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login', // 建议给每个路由起个名字
  component: () =>
            import ('@/views/login/login.vue')
},
{
  path: '/',
  name: 'tab-bar',
  component: () =>
            import ('@/views/tab-bar'),
  children: [{
    path: '',
    component: () =>
                import ('@/views/home')
  }, {
    path: 'qa',
    component: () =>
                import ('@/views/qa')
  }, {
    path: 'video',
    component: () =>
                import ('@/views/video')
  }, {
    path: 'my',
    component: () =>
                import ('@/views/my')
  }]
}

]

const router = new VueRouter({
  routes
})

export default router
