import request from "@/common/request.js"

//获取商品列表
export function range(data){
	return request("/mall/WxGetRange", "GET", data)
}
//获取商品信息
export function get(data){
	return request("/mall/WxGet", "GET", data)
}
//新增订单
export function addOrder(data){
	return request("/order/Add", "GET", data)
}