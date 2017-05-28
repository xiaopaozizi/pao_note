import Vue from 'vue'
import VueRouter from 'vue-router'

// 作为Vue的插件
Vue.use(VueRouter)

import Home from '@/components/Home'
import Document from '@/components/Document'
import About from '@/components/About'

import Study from '@/views/study'
import Work from '@/views/work'
import Hobby from '@/views/hobby'

import Slider from '@/views/slider'
// 引入样式
import '@/assets/css/app'

export default new VueRouter({
  mode : 'history',
  routes : [
    {
      path : '/',
      component : Home
    },
    {
      path : '/document',
      components : {
        default : Document,
        slider : Slider
      }
    },
    {
      path : '/about',
      component : About,
      children : [  // ps:子路由不需要"/"
        {
          path : '', // 默认为 /about
          component : Study
        },
        {
          path : 'work',
          component : Work
        },
        {
          path : 'hobby',
          component : Hobby
        }
      ]
    },
    {
      path : '*',
      component : Home
    }
  ]
})
