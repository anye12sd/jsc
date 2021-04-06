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
export function introducecurdlist(){
    return request({
        method:"get",
        url:"/introduce/curd/list"
    })
}

// Introduce/del

export function introducedel(){
    return request({
        method:"get",
        url:"/Introduce/del"
    })
}

