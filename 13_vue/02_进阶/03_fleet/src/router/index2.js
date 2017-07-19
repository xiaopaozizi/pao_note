import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/pao-nav/Home'

import order2 from '@/components/business/order2/list'
import waybill2 from '@/components/business/waybill2/list'

import driverList from '@/components/logistics/driverList'
import carManage from '@/components/logistics/carManage/list'
import customer from '@/components/logistics/customer/list'


import bill2 from '@/components/settlement/bill2/List'
import notice2 from '@/components/settlement/notice2/List'
import writeOff from '@/components/settlement/write-off/writeOffList'
import account from '@/components/settlement/account/accountList'



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
      name : '箱单',
      component : Home,
      // 重定向
      redirect : '/business/order2',
      // 是否显示菜单----再后台首页--左侧---导航条显示
      showMenu : true,
      // 是否为唯一的叶子节点，即没有子菜单
      leaf : true,
      // 图标
      iconCol : 'iconfont icon-home',
      children:[
        { path : '/business/order2', name : '订单', component : order2, meta : { parent : '箱单'} },
        { path : '/business/waybill2', name : '运单', component : waybill2, meta : { parent : '箱单'} },
      ]
    },
    {
      path : '/',
      name : '后勤',
      component : Home,
      // 是否显示菜单----再后台首页--左侧---导航条显示
      showMenu : true,
      // 是否为唯一的叶子节点，即没有子菜单
      leaf : true,
      // 图标
      iconCol : 'iconfont icon-home',
      children:[
        { path : '/logistics/driverList', name : '司机', component : driverList, meta : { parent : '后勤'} },
        { path : '/logistics/carManage', name : '车辆', component : carManage, meta : { parent : '后勤'} },
        { path : '/logistics/customer', name : '客户', component : customer, meta : { parent : '后勤'} },
      ]
    },
    {
      path : '/',
      name : '结算',
      component : Home,
      // 是否显示菜单----再后台首页--左侧---导航条显示
      showMenu : true,
      // 是否为唯一的叶子节点，即没有子菜单
      leaf : true,
      // 图标
      iconCol : 'iconfont icon-home',
      children:[
        { path : '/settlement/bill2', name : '账单', component : bill2, meta : { parent : '结算'} },
        { path : '/settlement/notice2', name : '通知', component : notice2, meta : { parent : '结算'} },
        { path : '/settlement/writeOff', name : '销账', component : writeOff, meta : { parent : '结算'} },
        { path : '/settlement/account', name : '账户', component : account, meta : { parent : '结算'} },
      ]
    },

  ],
})
// 路由拦截器
/*router.beforeEach ((to, from, next) => {
  //console.log(to.path);
  if(to.path.startsWith('/login')){
    // 登录路由，直接进入
    next();
  } else {
    // 不是登录路由，读取sessionStorage中的access-user
    // 如果存在，直接跳转到后台管理界面，如果不存在，则需要登录
    let user = JSON.parse(window.sessionStorage.getItem('access-user'));
    if(!user){
      next({ path : '/login'})
    } else {
      next();
    }
  }
})*/

export default router;
