import request from "@/request.js"
// 系统管理员
export function getMenu(){
    return request({
        method:'get',
        url:'menu'
    })
}

