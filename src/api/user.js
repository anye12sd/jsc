import request from "@/request.js"
// 系统管理员
export function aaaa(){
    return request({
        method:'get',
        url:'menu?access_token=aaaa',
        params:{}
    })
}
// 业务单位部门管理员
export function bbbb(){
    return request({
        method:'get',
        url:'menu?access_token=bbbb',
        params:{}
    })
}
// 普通用户
export function cccc(){
    return request({
        method:'get',
        url:'menu?access_token=cccc',
        params:{}
    })
}
// 模型开发人员（专业人员）
export function dddd(){
    return request({
        method:'get',
        url:'menu?access_token=cccc',
        params:{}
    })
}