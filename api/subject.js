import request from "@/common/request.js"

//课程列表
export function getRange(data){
	return request("/sub/GetRange", "GET", data)
}

//课程详情
export function getInfo(data){
	return request("/sub/GetInfoWithVideo", "GET", data)
}

//课程视频
export function getVideo(data){
	return request("/sub/GetVideoInfo", "GET", data)
}