import request from "@/common/request.js"

//微信登陆接口
export function getRange(data){
	return request("/sub/GetRange", "GET", data)
}