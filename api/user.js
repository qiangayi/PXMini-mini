import request from "@/common/request.js"

//微信登陆接口
export function login(data){
	return request("/wx/OnLogin", "GET", data)
}

export function register(data){
	return request("/stu/Regeist", "POST", data)
}

export function setSub(data){
	return request("/stu/SetSubject", "GET", data)
}

export function recordWatch(data){
	return request("/video/RecordWatch", "GET", data)
}

export function tchBingWx(data){
	return request("/seller/BindWxByCM", "GET", data)
}

export function stuBingWx(data){
	return request("/stu/BindWxByCM", "GET", data)
}