import request from "@/common/request.js"

//微信登陆接口
export function login(data){
	console.log("api")
	return request("/wx/OnLogin", "GET", data)
}