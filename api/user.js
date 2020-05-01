import request from "@/common/request.js"

//微信登陆接口
export function login(data){
	return request("/wx/OnLogin", "GET", data)
}

export function register(data){
	return request("/stu/Regeist", "POST", data)
}