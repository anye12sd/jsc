export default {
  namespaced: true,
  state: {
   modelInfo:{},
   times:0
  },
  //修改state
  mutations: {
    setModelInfo(state,payload) {
      state.modelInfo = payload
    }, 
    settimes(state,payload){
      state.times = payload
    }
  },
  // actions:store下的异步操作;组件中通过dispatch action触发action操作;
  // 但是action中不能更新state，需要通过commit mutation触发mutation操作，更新状态。
  actions: {

  },
  // getters:计算属性
  // getters不区分模块，不能重名。
  getters: {

  }
}