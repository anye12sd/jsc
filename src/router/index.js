import Vue from 'vue'
import VueRouter from 'vue-router'
import PcCokpit from "@/views/pcCockpit"
import store from "../store"

// console.log(store.state.jurisdiction,store.state.jurisdiction.supermarket)


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/login')
  },
  {
    path: "/loading",
    name: "Loading",
    component: () => import('../views/login/loading')
  },
  {
    path: "/pcCockpit",
    component: PcCokpit,
    // children:store.state.jurisdiction.pcCockpit
    children: [
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
    ]
  },
  {
    path: "/supermarket",
    component: () => import('../views/supermarket'),
    // children:store.state.jurisdiction.supermarket
    children: [
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
    ]
  },
  {
    path: "/modelIntroduce",
    name: "ModelIntroduce",
    component: () => import('../views/modelIntroduce')
  },
  {
    path: "/process",
    // name:"Process",
    component: () => import("../views/process"),
    // children:store.state.jurisdiction.process
    children: [
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
    ]
  },
  {
    path: "/demand",
    // name: "Demand",
    component: () => import("../views/demand"),
    // children:store.state.jurisdiction.demand
    children:[{
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
    }]
  },
  {
    path: "/userAuthorization",
    // name: "UserAuthorization",
    component: () => import("../views/userAuthorization"),
    // children:store.state.jurisdiction.userAuthorization
    children:[{
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
    }]
  },
  {
    path:"/sqlPreview/:id",
    name:"SqlPreview",
    component:()=>import("../components/sqlPreview")
  },
  // 普通用户页面
  {
    path:"/oridinaryUsers",
    component:()=>import("../views/ordinaryUsers")
  }

]

const router = new VueRouter({
  routes
})

export default router
