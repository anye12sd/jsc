import axios from 'axios'
import store from '@/store'
import router from '@/router'


let baseURL = null;
if (process.env.NODE_ENV == "development") {
	baseURL = '/api'
}
if (process.env.NODE_ENV == "production") {
	baseURL = 'http://10.21.197.237'
}
const request = axios.create({
	baseURL
	// timeout:5000
})
// console.log(location)
let access_token = location.search.split("=")[1]
// console.log(location,access_token)
request.interceptors.request.use(
	config => {
		// console.log("请求拦截器")
		// console.log(config)
		// if(config.params)
		// let access_token = "cccc";
		if (access_token) {
			if (config.data) {
				// console.log(typeof config.data)
				config.data.access_token = access_token
			} else {
				// console.log(access_token)
				config.params = {
					access_token
				}
			}
		}

		return config
	},
	err => {
		return Promise.reject(err)
	}
)
request.interceptors.response.use(
	response => {
		return response
	},
	err => {
		return Promise.reject(err)
	}
)

export default request;