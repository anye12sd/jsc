import Vue from 'vue'
import VueRouter from 'vue-router'
import PcCokpit from "@/views/pcCockpit"
import store from "../store"



Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

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
    path: "/pcCockpit",
    component: PcCokpit,
    children: [
      {
        path: "",
        redirect: "distribution"
      },
      // {
      //   path: "subScribe",
      //   name: "SubScribe",
      //   component: () => import("@/views/pcCockpit/subscribe")
      // },
      {
        path:"distribution",
        name:"Distribution",
        component: () => import("@/views/pcCockpit/distribution")
      }
    ]
  },
  {
    path: "/supermarket",
    component: () => import('../views/supermarket'),
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
      // {
      //   path: "modelDownload",
      //   name: "ModelDownload",
      //   component: () => import("@/views/supermarket/modelDownload")
      // },
      // {
      //   path: "modelPuton",
      //   name: "ModelPuton",
      //   component: () => import("@/views/supermarket/modelPuton")
      // },
      // {
      //   path: "modelSubsc",
      //   name: "ModelSubsc",
      //   component: () => import("@/views/supermarket/modelSubsc")
      // }
    ]
  },
  // {
  //   path: "/modelIntroduce",
  //   name: "ModelIntroduce",
  //   component: () => import('../views/modelIntroduce')
  // },
  {
    path: "/process",
    // name:"Process",
    component: () => import("../views/process"),
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
    component:()=>import("../views/ordinaryUsers"),
    children:[
      {
        path:'',
        redirect:"pcdrive"
      },
      {
        path:"pcdrive",
        name:"Pcdirve",
        component:()=>import("../views/ordinaryUsers/pcdrive")
      },
      {
        path:'modelmarket',
        name:"Modelmarket",
        component:()=>import("../views/ordinaryUsers/modelmarket")
      },
      {
        path:"application",
        name:"Application",
        component:()=>import('../views/ordinaryUsers/application')
      },
      {
        path:'datamarket',
        name:"Datamarket",
        component:()=>import("../views/ordinaryUsers/datamarket")
      },
      {
        path:"detail/:id",
        name:"Detail",
        component:()=>import("../views/ordinaryUsers/detail")
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
