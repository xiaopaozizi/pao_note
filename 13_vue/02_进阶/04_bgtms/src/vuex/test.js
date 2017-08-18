/**
 * Created by laoniu on 2017-05-24.
 */
const state = {
  page: 40,
  ace: "你好"
}

// 定义所需的 mutations  访问触发状态
const mutations = {
  jia(state) {
    state.page++
  }
}


//通过getters引用 state
const getters = {
  page(state) {
    return state.page +50
  }
}

//通过actions 引用mutations
const actions = {
  jia({commit}) {
    commit('jia')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
