// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router/index2'
import axios from 'axios';
import store from './vuex/store'
// need if you use ag-grid enterprise features
//import "ag-grid-enterprise/main";

import 'element-ui/lib/theme-default/index.css'
import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome.min.css'
import './assets/js/bootstrap.min'
import "./assets/js/siderbar"
import "@/assets/css/home.css"
import "@/assets/iconfont.css"


import {AgGridVue} from "ag-grid-vue"
Vue.use(ElementUI)

Vue.config.productionTip = false
/*改写原型链*/
/*Vue.prototype.$axios = axios;*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }

})
