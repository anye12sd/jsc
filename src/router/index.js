import Vue from 'vue'
import VueRouter from 'vue-router'
import PcCokpit from "@/views/pcCockpit"
import store from "../store"

console.log(store.state.jurisdiction)


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/pcCockpit",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/login')
  },
  {
    path: "/pcCockpit",
    // name:"PcCockpit",
    component: PcCokpit,
    children:store.state.jurisdiction.pcCockpit
    // children: [
    //   {
    //     path: "",
    //     redirect: "pageShow"
    //   },
    //   {
    //     path: 'pageShow',
    //     name: "PageShow",
    //     component: () => import("../views/pcCockpit/pageshow")
    //   },
    //   {
    //     path: "approval",
    //     name: "Apprival",
    //     component: () => import("../views/pcCockpit/approval")
    //   },
    //   {
    //     path: "subScribe",
    //     name: "SubScribe",
    //     component: () => import("../views/pcCockpit/subscribe")
    //   }
    // ]
  },
  {
    path: "/supermarket",
    // name:"Supermarket",
    component: () => import('../views/supermarket'),
    children:store.state.jurisdiction.supermarket
    // children: [
    //   {
    //     path: "",
    //     redirect: "modelManaga"
    //   },
    //   {
    //     path: "modelManaga",
    //     name: "Modelmanaga",
    //     component: () => import("../views/supermarket/modelManaga")
    //   },
    //   {
    //     path: "modelDownload",
    //     name: "ModelDownload",
    //     component: () => import("../views/supermarket/modelDownload")
    //   },
    //   {
    //     path: "modelPuton",
    //     name: "ModelPuton",
    //     component: () => import("../views/supermarket/modelPuton")
    //   },
    //   {
    //     path: "modelSubsc",
    //     name: "ModelSubsc",
    //     component: () => import("../views/supermarket/modelSubsc")
    //   }
    // ]
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
    children:store.state.jurisdiction.process
    // children: [
    //   {
    //     path: "",
    //     redirect: "hasDoing"
    //   },
    //   {
    //     path: "hasDoing",
    //     name: "HasDoing",
    //     component: () => import("@/views/process/hasDoing")
    //   },
    //   {
    //     path: "iStarted",
    //     name: "IStarted",
    //     component: () => import("@/views/process/iStarted")
    //   },
    //   {
    //     path: "waitDoing",
    //     name: "WaitDoing",
    //     component: () => import("@/views/process/waitDoing")
    //   }
    // ]
  },
  {
    path: "/demand",
    // name: "Demand",
    component: () => import("../views/demand"),
    children:store.state.jurisdiction.demand
  },
  {
    path: "/userAuthorization",
    // name: "UserAuthorization",
    component: () => import("../views/userAuthorization"),
    children:store.state.jurisdiction.userAuthorization
    // children:[
    //   {
    //     path:"",
    //     redirect:"userManaga"
    //   },
    //   {
    //     path:"roleManaga",
    //     name:"RoleManaga",
    //     component:()=>import("../views/userAuthorization/roleManaga")
    //   },
    //   {
    //     path:"roleAssignment",
    //     name:"RoleAssignment",
    //     component:()=>import("../views/userAuthorization/roleAssignment")
    //   },
    //   {
    //     path:"userManaga",
    //     name:"UserManaga",
    //     component:()=>import("../views/userAuthorization/userManaga")
    //   }
    // ]
  },

]

const router = new VueRouter({
  routes
})

export default router
