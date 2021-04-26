import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios'
import echarts from 'echarts'
import request from "./request.js"
import 'element-ui/lib/theme-chalk/index.css';
import Scroll from "vue-seamless-scroll"


Vue.use(ElementUI);
Vue.use(Scroll)
Vue.prototype.$axios = axios  // this.$axios即可调用axios的方法
Vue.prototype.$request = request; //this.$request调用请求拦截器
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
