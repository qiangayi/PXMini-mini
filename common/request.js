// 采用网友提供的request封装
// https://www.cnblogs.com/gqx-html/p/10967570.html
import urlConfig from '@/base.js'
import {
	getToken
} from "@/common/auth.js"

const request = {}
const headers = {}
const api = 'api'

request.globalRequest = (url, method, data, power) => {
	/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
	== 不通过access_token校验的接口
	== 文件下载接口列表
	== 验证码登录 */
	switch (power) {
		case 1:
			headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
			break;
		case 2:
			headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
			break;
		case 3:
			responseType = 'blob'
			break;
		default:
			// headers['Authorization'] = `Bearer ${this.$store.getters.userInfo}`
			// headers['TENANT-ID'] = this.$store.getters.userInfo.tenant_id
			break;
	}
	// console.log(store)
	// console.log(getToken())
	headers['X-Token'] = getToken()
	// console.log(`url:${urlConfig + url}`)
	return uni.request({
		url: urlConfig + api + url,
		method,
		data: data,
		dataType: 'json',
		header: headers
	}).then(res => {
		console.log(res)
		if(res.length == 1){
				uni.showToast({
					title: '连接服务器错误！',
					icon: 'none'
				});
				throw res[0]
		}
		if (res[1].statusCode = 200) {
			return res[1]
		} else {
			throw res[1].data
		}
	}).catch(parmas => {
		switch (parmas.code) {
			case 401:
				uni.clearStorageSync()
				break
			default:
				uni.showToast({
					title: parmas.message,
					icon: 'none'
				})
				return Promise.reject()
				break
		}

	})
}

export default request.globalRequest
