import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PcCokpit from "@/views/pcCockpit"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PcCokpit',
    component: PcCokpit
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
  }

]

const router = new VueRouter({
  routes
})

export default router
