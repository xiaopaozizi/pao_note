import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import UserList from '@/components/UserList'
import BookList from '@/components/BookList'
import BookCategory from '@/components/BookCategory'
import Profile from '@/components/Profile'
import ModPwd from '@/components/ModPwd'

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
      name : '后台首页',
      component : Home,
      // 重定向
      redirect : '/admin',
      // 是否显示菜单----再后台首页--左侧---导航条显示
      showMenu : true,
      // 是否为唯一的叶子节点，即没有子菜单
      leaf : true,
      // 图标
      iconCol : 'iconfont icon-home',
      children:[
        { path : '/admin', name : '首页', component : Admin }
      ]
    },
    {
      path : '/',
      name : '用户管理',
      component : Home,
      // 是否显示菜单----再后台首页--左侧---导航条显示
      showMenu : true,
      // 是否为唯一的叶子节点，即没有子菜单
      leaf : true,
      // 图标
      iconCol : 'iconfont icon-users',
      children:[
        { path : '/user/list', name : '用户列表', component : UserList }
      ]
    },
    {
      path : '/',
      name : '图书管理',
      component : Home,
      // 是否显示菜单----再后台首页--左侧---导航条显示
      showMenu : true,
      // 图标
      iconCol : 'iconfont icon-books',
      children:[
        { path : '/book/list', name : '图书列表', component : BookList },
        { path : '/book/category', name : '图书类别', component : BookCategory }
      ]
    },
    {
      path : '/',
      name : '设置',
      component : Home,
      // 是否显示菜单----再后台首页--左侧---导航条显示
      showMenu : true,
      // 图标
      iconCol : 'iconfont icon-setting1',
      children:[
        { path : '/user/profile', name : '个人信息', component : Profile },
        { path : '/user/modPwd', name : '修改密码', component : ModPwd }
      ]
    },

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
      next({ path : '/login'})
    } else {
      next();
    }
  }
})

export default router;
