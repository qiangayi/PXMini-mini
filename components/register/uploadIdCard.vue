<template>
	<view class="">
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				{{title}}
			</view>
			<view class="action">
				{{imgList.length}}/{{limit}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<!-- <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view> -->
				</view>
				<view class="solids" @tap="ChooseImage(0)" :hidden="hideFront">
					<text class='cuIcon-cameraadd'>正面</text>
				</view>
				<view class="solids" @tap="ChooseImage(1)" :hidden="hideBack">
					<text class='cuIcon-cameraadd'>反面</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uploadIdCard,
		uploadImg
	} from '@/api/upload.js'
	export default {
		props: {
			title: {
				type: String,
				default: "",
			},
			limit: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				imgList: [],
				fileList: ['', ''],
				hideFront: false,
				hideBack: false
			}
		},
		methods: {
			ChooseImage(side) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						if (side == 0) {
							this.hideFront = true
						} else {
							this.hideBack = true
						}
						//上传图片文件	
						// console.log(res.tempFiles)
						const fileName = this.GetFileName(res.tempFilePaths[0])
						// console.log(fileName)
						if (side == 0) {
							const formData = this.GetFileForm(fileName, side)
							uploadIdCard(res.tempFilePaths[0], formData).then(res => {
								const data = JSON.parse(res[1].data)
								this.fileList[0] = data.Data.fileName
								this.$emit("upload", this.fileList)

								console.log(data.Data.card)
								this.$emit("idCard", data.Data.card)
							})
						} else {
							uploadImg(res.tempFilePaths[0]).then(res => {
								const data = JSON.parse(res[1].data)
								this.fileList[1] = data.Data.fileName
								this.$emit("upload", this.fileList)
							})
						}
					}
				});
			},
			GetFileName(filePath) {
				const arr = filePath.split('/')
				const file = arr[arr.length - 1]
				return file
				// const index = file.lastIndexOf('.')
			},
			GetFileForm(file, type) {
				var index = file.lastIndexOf('.')
				return {
					name: 'wxidcard',
					ext: file.substring(index + 1),
					type
				}
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
		}
	}
</script>

<style scoped>
	.cu-bar .action:first-child {
		margin-left: 15px;
		font-size: 15px;
	}
</style>
