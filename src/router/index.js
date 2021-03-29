import Vue from 'vue'
import VueRouter from 'vue-router'
import PcCokpit from "@/views/pcCockpit"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PcCokpit',
    component: PcCokpit
  },
  {
    path:"/login",
    name:"Login",
    component:()=> import ('../views/login')
  },
  {
    path:"/pcCockpit",
    name:"PcCockpit",
    component:PcCokpit
  },
  {
    path:"/supermarket",
    name:"Supermarket",
    component:() => import('../views/supermarket')
  },
  {
    path:"/modelIntroduce",
    name:"ModelIntroduce",
    component:() => import ('../views/modelIntroduce')
  }

]

const router = new VueRouter({
  routes
})

export default router
