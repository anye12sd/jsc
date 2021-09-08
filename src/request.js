import axios from 'axios'
import router from './router'
import store from '@/store'
import { Message } from 'element-ui';


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


request.interceptors.request.use(
	
	config => {
		let access_token = location.search.split("=")[1] || sessionStorage.getItem("access_token")
		// console.log(access_token,location.search.split("=")[1] , sessionStorage.getItem("access_token"))
		if (access_token) {
			if (config.data) {
				// console.log(typeof config.data)
				config.data.access_token = access_token
			} else {
				// console.log(config)
				if(config.url.includes("?")) {
                    config.url = config.url + "&access_token="+access_token
                } else {
                    config.url = config.url + "?access_token="+access_token
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
		// console.log(response)
		if(response.data.status == 400) {
			if(response.data.message) {
				Message.warning({
					message:response.data.message
				})
			}
			store.commit("config/setLogin", false);
			sessionStorage.removeItem('access_token')
			if (process.env.NODE_ENV == "development") {
				window.location.href = 'http://localhost:9000'
			}
			if (process.env.NODE_ENV == "production") {
				window.location.href = 'http://10.21.197.237'
			}
			return
		}
		return response
	},
	err => {
		return Promise.reject(err)
	}
)

export default request;