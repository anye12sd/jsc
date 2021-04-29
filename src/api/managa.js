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

export function appedit(data){
    return request({
        method:"post",
        url:"/app/edit",
        data
    })
}

export function demandedit(data){
    return request({
        method:'post',
        url:"/demand/edit",
        data
    })
}

export function demanddel(id){
    return request({
        method:"get",
        url:"/demand/del?id="+id
    })
}