// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入组件
// 登录页面
import Login from '@/pages/login.vue'
// 主页
import Index from '@/pages/index.vue'
// 欢迎
import Welcome from '@/pages/welcome.vue'
// 欢迎
import PostList from '@/pages/postList.vue'
// 欢迎
import PostAdd from '@/pages/postAdd.vue'
// use
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Index',
      path: '/',
      component: Index,
      redirect: { name: 'Welcome' },
      children: [
        {
          name: 'Welcome',
          path: 'wel',
          component: Welcome
        },
        {
          name: 'PostList',
          path: 'PostList',
          component: PostList
        
        },
        {
          name: 'PostAdd',
          path: 'PostAdd',
          component: PostAdd
        }
      ]
    }
  ]
})
// 添加导航守卫，首位导航
router.beforeEach((to, from, next) => {
  // 如果未登录不能去访问登录外的网页
  // 获取token
  var token = localStorage.getItem('hm_tt_token')
  if (token || to.path === '/login') {
    next()
  } else {
    next('/login')
  }

})
// 暴露路由对象
export default router
