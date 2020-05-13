import baseUrl from '@/base.js'

export function uploadImg(path) {

	return uni.uploadFile({
		url: `${baseUrl}/api/upload/img`, //仅为示例，非真实的接口地址
		filePath: path,
		name: 'file',
		formData: {
			'name': 'test',
			'ext': 'png'
		}
	});
}

export function uploadIdCard(path, data) {
	return uni.uploadFile({
		url: `${baseUrl}/api/upload/idcard`, //仅为示例，非真实的接口地址
		filePath: path,
		name: 'file',
		formData: data
	});
}

export function chooseImage() {
	return uni.chooseImage({
		count: 1, //默认9
		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
	})
}
