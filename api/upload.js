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
