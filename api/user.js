import request from "@/common/request.js"

//微信登陆接口
export function login(data){
	return request("/wx/OnLogin", "GET", data)
}

//微信登出接口
export function loginOut(data){
	return request("/wx/LoginOut", "GET", data)
}

//注册接口
export function register(data){
	return request("/stu/Regeist", "POST", data)
}

//验证码
export function mobileCode(data){
	return request("/code/SendCode", "GET", data)
}

//验证码验证
export function validCode(data){
	return request("/code/ValidCode", "GET", data)
}

//课程学习
export function setSub(data){
	return request("/stu/SetSubject", "GET", data)
}

//记录播放时间
export function recordWatch(data){
	return request("/video/RecordWatch", "GET", data)
}

export function recordTeachFile(data){
	return request("/video/RecordFile", "GET", data)
}

//教师绑定微信
export function tchBingWx(data){
	return request("/seller/BindWxByCM", "GET", data)
}

//学员绑定微信
export function stuBingWx(data){
	return request("/stu/BindWxByCM", "GET", data)
}

//获取注册信息
export function getSign(data){
	return request("/stu/GetSign", "GET", data)
}

export function addSign(data){
	return request("/stu/AddSign", "GET", data)
}