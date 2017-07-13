import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
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

  ]
})
