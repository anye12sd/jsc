import axios from 'axios'
import store from '@/store'
import router from '@/router'

const request = axios.create({
	baseURL:"http://192.168.124.4",
	// timeout:5000
})

request.interceptors.request.use(
	config=>{
		console.log("请求拦截器")
		console.log(config)
		return config
	},
	err=>{
		return Promise.reject(err)
	}
)
request.interceptors.response.use(
	response=>{
		// console.log("响应拦截器")
		// console.log(response)
		return response
	},
	err=>{
		return Promise.reject(err)
	}
)

export default request ;