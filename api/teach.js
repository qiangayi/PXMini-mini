import request from "@/common/request.js"

//获取视频提问列表
export function range(data){
	return request("/teach/AskRange", "GET", data)
}
//新增提问
export function addAsk(data){
	return request("/teach/wxAdd", "GET", data)
}

//新增回复
export function addReply(data){
	return request("/teach/wxReply", "GET", data)
}