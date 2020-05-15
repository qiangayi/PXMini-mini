import request from "@/common/request.js"

//普通课程列表
export function getRange(data){
	return request("/sub/GetNormalRange", "GET", data)
}

//用户购买的精品课程列表
export function getScoreRange(data){
	return request("/sub/GetScoreRangeByIds", "GET", data)
}

//课程详情
export function getInfo(data){
	return request("/sub/WxGetInfoWithVideo", "GET", data)
}

//课程视频
export function getVideo(data){
	return request("/sub/WxGetVideoInfo", "GET", data)
}