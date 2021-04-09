import request from "@/request.js"

export function getsubscribe(page){
    return request({
        method:'get',
        url:'/subscribe/user?page=' +page
    })
}

export function getorder(page) {
    return request({
        method:"get",
        url:"/portal/order?page="+page
    })
}

export function order(num) {
    return request({
        method:"get",
        url:"/list/order?"+num
    })
}

export function dele(num) {
    return request({
        method:"get",
        url:"/portal/del?id="+num
    })
}

export function getlist(page) {
    return request({
        method:"get",
        url:"/app/list?page="+page
    })
}

export function appuser(page){
    return request({
        method:"get",
        url:"/app/user?page="+page
    })
}

export function appuserlist(page){
    return request({
        method:"get",
        url:"/app/user/list?page="+page
    })
}

export function introducelist(){
    return request({
        method:"get",
        url:"/Introduce/list"
    })
}

export function demandadd(data){
    return request({
        method:"post",
        url:"/demand/add",
        data
    })
}
// 其他人员
export function introduce(id){
    return request({
        method:"get",
        url:"/Introduce?id="+id
    })
}
//单位管理员
export function introducecurdlist(page){
    return request({
        method:"get",
        url:"/introduce/curd/list?page="+page
    })
}

// Introduce/del

export function introducedel(){
    return request({
        method:"get",
        url:"/Introduce/del"
    })
}

export function demandlist(str){
    return request({
        method:"get",
        url:"/demand/list?"+str
    })
}

export function demandstatus(str){
    return request({
        method:"get",
        url:"/demand/status?"+str
    })
}

export function demandstatusall(str){
    return request({
        method:"get",
        url:"/demand/status/all?"+str
    })
}


export function appload(str){
    return request({
        method:"get",
        url:"/app/load?"+str
    })
}

export function appbranch(){
    return request({
        method:"get",
        url:"/app/branch"
    })
}

export function userList(page){
    return request({
        method:"get",
        url:"/user/list?page="+page
    })
}

export function user(id){
    return request({
        method:"get",
        url:"/user?id="+id
    })
}

export function userEdit(data){
    return request({
        method:"post",
        url:"/user/edit",
        data
    })
}

export function userRloe(){
    return request({
        method:"get",
        url:"/user/role"
    })
}

export function userroleedit (str) {
    return request({
        method:"get",
        url:"/user/role/edit"+str
    })
}

export function demandexecute (str) {
    return request({
        method:"get",
        url:"/demand/execute?"+str
    })
}

export function appAdd(data) {
    return request({
        method:"post",
        url:"/app/add",
        data
    })
}

export function apppreview(id){
    return request({
        method:"get",
        url:"/app/preview?id="+id
    })
}