// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import "./assets/css/main.css"
import "./assets/css/color-blue.css"
import "./assets/js/jquery-3.2.1.min.js"
import "./assets/js/bootstrap.min.js"
import "./assets/css/bootstrap.min.css"
import "./assets/css/font-awesome.min.css"

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
