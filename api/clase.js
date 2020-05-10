import request from "@/common/request.js"

//获取班级信息
export function get(data){
	return request("/clase/Get", "GET", data)
}