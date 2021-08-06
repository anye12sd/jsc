import axios from 'axios'

export const downloadUrl = (url) => {
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
        document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
}

// let baseURL = null;
// if (process.env.NODE_ENV == "development") {
//     baseURL = '/api1'
// }
// if (process.env.NODE_ENV == "production") {
//     baseURL = 'http://10.21.197.237'
// }
// const request = axios.create({
//     baseURL
//     // timeout:5000
// })

// let access_token = location.search.split("=")[1]
// request.interceptors.request.use(
//     config => {
//
//         if (access_token) {
//             if (config.data) {
//                 // console.log(typeof config.data)
//                 config.data.access_token = access_token
//             } else {
//                 // console.log(access_token)
//                 if(config.url.includes("?")) {
//                     config.url = config.url + "&access_token="+access_token
//                 } else {
//                     config.url = config.url + "?access_token="+access_token
//                 }
//                 // config.params = {
//                 // 	access_token
//                 // }
//             }
//         }
//
//         return config
//     },
//     err => {
//         return Promise.reject(err)
//     }
// )

axios.interceptors.response.use(res => {
    console.log(res)
    if (res.data.status && res.data.status === 300) {
        return '300' // 链接正确，下载失败
    } else {
        downloadUrl(res.request.responseURL)
        return '200' // 链接正确，下载成功
    }
}, error => {
    console.log("eee")
    // Do something with response error
    return error // 链接错误
})

export default axios