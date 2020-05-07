import request from "@/common/request.js"

//获取视频提问列表
export function range(data){
	return request("/exam/GetBySubId", "GET", data)
}