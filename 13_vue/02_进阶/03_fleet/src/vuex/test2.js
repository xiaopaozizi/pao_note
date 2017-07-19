// 应用初始状态  state 访问状态对象
const state = {
  count: 20,
  ace: "你好"
}

// 定义所需的 mutations  访问触发状态
const mutations = {
  jian(state) {
    state.count--
  }
}


//通过getters引用 state
const getters = {
  count(state) {
    return state.count +50
  }
}

//通过actions 引用mutations
const actions = {
  jianplus({commit}) {
    commit('jian')
  }
}


export default {
  state,
  mutations,
  getters,
  actions
}
