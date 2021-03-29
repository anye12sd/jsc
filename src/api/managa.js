import request from "@/request.js"

export function submit(formdata){
    return request({
        method:'post',
        headers: {'Content-Type': 'multipart/form-data'},
        url:'',
        data:formdata
    })
}