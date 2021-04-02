export default {
  namespaced: true,
  state: {
    pcCockpit:[
      {
        path: "",
        redirect: "pageShow"
      },
      {
        path: 'pageShow',
        name: "PageShow",
        component: () => import("@/views/pcCockpit/pageshow")
      },
      {
        path: "approval",
        name: "Apprival",
        component: () => import("@/views/pcCockpit/approval")
      },
      {
        path: "subScribe",
        name: "SubScribe",
        component: () => import("@/views/pcCockpit/subscribe")
      }
    ],
    supermarket:[
      {
        path: "",
        redirect: "modelManaga"
      },
      {
        path: "modelManaga",
        name: "Modelmanaga",
        component: () => import("@/views/supermarket/modelManaga")
      },
      {
        path: "modelDownload",
        name: "ModelDownload",
        component: () => import("@/views/supermarket/modelDownload")
      },
      {
        path: "modelPuton",
        name: "ModelPuton",
        component: () => import("@/views/supermarket/modelPuton")
      },
      {
        path: "modelSubsc",
        name: "ModelSubsc",
        component: () => import("@/views/supermarket/modelSubsc")
      }
    ],
    process: [
      {
        path: "",
        redirect: "waitDoing"
      },
      {
        path: "hasDoing",
        name: "HasDoing",
        component: () => import("@/views/process/hasDoing")
      },
      {
        path: "iStarted",
        name: "IStarted",
        component: () => import("@/views/process/iStarted")
      },
      {
        path: "waitDoing",
        name: "WaitDoing",
        component: () => import("@/views/process/waitDoing")
      }
    ],
    userAuthorization:[{
      path:"",
      redirect: "userManaga"
    },{
      path:"userManaga",
      name:"UserManaga",
      component:()=> import("@/views/userAuthorization/userManaga")
    },{
      path:"roleManaga",
      name:"RoleManaga",
      component:()=> import("@/views/userAuthorization/roleManaga")
    },{
      path:"roleAssignment",
      name:"RoleAssignment",
      component:()=> import("@/views/userAuthorization/roleAssignment")
    }],
    demand:[{
      path:"",
      redirect: "addNewDemand"
    },{
      path:"addNewDemand",
      name:"AddNewDemand",
      component:()=> import("@/views/demand/addNewDemand")
    },{
      path:"demandHandle",
      name:"DemandHandle",
      component:()=> import("@/views/demand/demandHandle")
    },{
      path:"waitDemand",
      name:"WaitDemand",
      component:()=> import("@/views/demand/waitDemand")
    },{
      path:"hasDoneDemand",
      name:"HasDoneDemand",
      component:()=> import("@/views/demand/hasDoneDemand")
    }],
  },
  //修改state
  mutations: {
    // 设置默认路由
    setpcCockpit(state,payload){
      state.pcCockpit[0].redirect = payload
    },
    setprocess(state,payload){
      state.process[0].redirect = payload
    },
    setsupermarket(state,payload){
      state.supermarket[0].redirect = payload
    },
    setuserAuthorization(state,payload){
      state.userAuthorization[0].redirect = payload
    },
    setdemand(state,payload){
      state.userAuthorization[0].redirect = payload
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