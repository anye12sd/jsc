import request from "@/request.js"

export function getsubscribe(str){
    return request({
        method:'get',
        url:'/subscribe/user?' +str
    })
}

export function getorder(str) {
    return request({
        method:"get",
        url:"/portal/order?"+str
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

export function getlist(str) {
    return request({
        method:"get",
        url:"/app/list?"+str
    })
}

export function getmodellist(str) {
    return request({
        method:"get",
        url:"/module/list?"+str
    })
}

export function appuser(str){
    return request({
        method:"get",
        url:"/app/user?"+str
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

export function appadd(data){
    return request({
        method:"post",
        url:"/app/add",
        data
    })
}

// 改版后修改模型
export function modeledit(data){
    return request({
        method:"post",
        url:"/module/edit",
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

export function modelload(str){
    return request({
        method:"get",
        url:"/module/load?"+str
    })
}

export function appbranch(){
    return request({
        method:"get",
        url:"/app/branch"
    })
}

export function modulebranch(){
    return request({
        method:"get",
        url:"/module/branch"
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

export function appCategory(){
    return request({
        method:"get",
        url:"/app/category"
    })
}

export function portalSubscribe(str){
    return request({
        method:"get",
        url:"/portal/subscribe?"+str
    })
}

export function portalSubscribeall(str){
    return request({
        method:"get",
        url:"/portal/subscribeall?"+str
    })
}

export function subscribeList(str){
    return request({
        method:"get",
        url:"/subscribe/list?"+str
    })
}
// 订阅列表
export function portaluser(str){
    return request({
        method:"get",
        url:"/portal/user?" +str
    })
}

export function subscribeall(str){
    return request({
        method:"get",
        url:"/subscribe/all?"+str
    })
}

export function categoryadd(str){
    return request({
        method:"get",
        url:"/category/add?"+str
    })
}

export function categoryedit(str) {
    return request({
        method:"get",
        url:"/category/edit?"+str
    })
}

export function categorydel (str) {
    return request({
        method:"get",
        url:"/category/del?"+str
    })
}

export function getdetail(id){
    return request({
        method:"get",
        url:"/message?id="+id
    })
}

export function getdemand (id) {
    return request ({
        method:"get",
        url:"/demand?id="+id
    })
}

export function demandhandlelist(str){
    return request ({
        method:"get",
        url:"/demand/handle/list?"+str
    })
}

export function getAppTime(){
    return request ({
        method:"get",
        url:"/app/time"
    })
}

export function postFormJr(data){
    return request ({
        method:"post",
        url:"/app/data_jr",
        data,
        responseType: 'blob'
    })
}

export function postFormWg(data){
    return request ({
        method:"post",
        url:"/app/data_wg",
        data,
        responseType: 'blob'
    })
}

export function appimage(){
    return request ({
        method:"get",
        url:"app/image",
    })
}