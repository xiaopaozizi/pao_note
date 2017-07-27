// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/css'
import router from './router'
import Axios from 'axios'
import VueAxios from 'vue-axios'
//import mock from '@/mock'



Vue.use(VueAxios, Axios)

Vue.config.productionTip = false


Vue.use(ElementUI)
// 初始化mock，可以直接发送axios
//mock.init();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
