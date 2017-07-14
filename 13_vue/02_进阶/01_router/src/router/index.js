import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

let router =  new Router({
  mode : 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path : '/',
      name : 'home',
      component : Home
    }
  ],
})
// 路由拦截器
router.beforeEach ((to, from, next) => {
  //console.log(to.path);
  if(to.path.startsWith('/login')){
    // 登录路由，直接进入
    next();
  } else {
    // 不是登录路由，读取sessionStorage中的access-user
    // 如果存在，直接跳转到后台管理界面，如果不存在，则需要登录
    let user = JSON.parse(window.sessionStorage.getItem('access-user'));

    if(!user){
      console.log('llll')
      next({ path : '/login'})
    } else {
      next();
    }
  }
})

export default router;
