/**
 * Created by laoniu on 2017-05-24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import test from './test'
import test2 from './test2'

Vue.use(Vuex)

// 创建 store 实例
export default new Vuex.Store({
  modules: {
    test,
    test2
  }
})
