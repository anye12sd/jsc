import request from "@/request.js"

export function submit(formdata){
    return request({
        method:"post",
        headers: {'Content-Type': 'multipart/form-data'},
        url:"/Introduce/add",
        data:formdata
    })
}

export function demanduser(){
    return request({
        method:"get",
        url:"/demand/user"
    })
}