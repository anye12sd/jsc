import axios from 'axios'
import router from './router'
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
let access_token = location.search.split("=")[1]
request.interceptors.request.use(
	config => {

		if (access_token) {
			if (config.data) {
				// console.log(typeof config.data)
				config.data.access_token = access_token
			} else {
				// console.log(access_token)
				if(config.url.includes("?")) {
                    config.url = config.url + "&access_token="+access_token
                } else {
                    config.url = config.url + "?access_token="+access_token
                }
				// config.params = {
				// 	access_token
				// }
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