import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
/* eslint-disable no-new */
// 实例化Vue
new Vue({
  // 挂载点
  el : '#app',
  // 注入路由
  router,
  // 模板
  template : '<app />',
  // 注册组件
  components : {
    App
  }
})
