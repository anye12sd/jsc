export default {
    namespaced: true,
    state: {
        currentRouterPath: "",
        isLogin: false,
        access_token: null,
        identity:1,
        userInfo:{
            userName:"王",
            role_id:3
        },
        showtopbar:false,
        topbararr:[],
        // PC驾驶舱
        1: [],
        // 应用成果超市
        2: [],
        // 模型介绍
        3: false,
        // 需求管理 只有一个页面分两种情况
        4: [],
        // 流程审批
        5: [],
        // 用户授权管理
        6: [],
    },
    //修改state
    mutations: {
        setShowTopBar(state,payload){
            state.showtopbar = payload
        },
        setLogin(state,payload){
            state.isLogin = payload
        },
        setUsetInfo(state,payload){
            state.userInfo = payload
        },
        settopbararr(state,payload){
            state.topbararr = payload
        },
        setidentity(state, payload){
            console.log("setidentity",payload)
            state.identity = payload
        },
        setPath(state, payload) {
            state.currentRouterPath = payload
        },
        setpcCockpit(state, payload) {
            let p = 1;
            state[p] = payload
            // console.log(state[p])
        },
        setsupermarket(state, payload) {
            let p = 2;
            // console.log(2222, payload)
            state[p] = payload
        },
        setmodelIntroduce(state, payload) {
            let p = 3;
            if (payload.items) {
                payload.items.forEach(item => {
                    // 14有模型介绍新增
                    if (item.id == 14) {
                        state[p] = true
                    }
                })
            }
        },
        setprocess(state, payload) {
            let p = 5;
            state[p] = payload
        },
        setuserAuthorization(state, payload) {
            let p = 6;
            state[p] = payload
        },
        setdemand(state, payload) {
            let p = 4;
            state[p] = payload
        },

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