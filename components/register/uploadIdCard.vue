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
				<view class="solids" @tap="ChooseImage(0)" :hidden="hideFront">
					<text class='cuIcon-cameraadd'>正面</text>
				</view>
				<view class="bg-img card-img" @tap="ViewImage" :data-url="imgList[0]" :hidden="imgList[0] == ''">
					<image :src="imgList[0]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="handleRemove" :data-index="0">
						<text class='cuIcon-close'></text>
					</view>

					<!-- <view class="cu-load load-cuIcon loading"></view> -->
					<view class="cu-load bg-grey loading" ></view>
				</view>
				<view class="solids" @tap="ChooseImage(1)" :hidden="hideBack">
					<text class='cuIcon-cameraadd'>反面</text>
				</view>
				<view class="bg-img card-img" @tap="ViewImage" :data-url="imgList[1]" :hidden="imgList[1] == ''">
					<image :src="imgList[1]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="handleRemove" :data-index="1">
						<text class='cuIcon-close'></text>
					</view>
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
				imgList: ['', ''],
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
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						// if (this.imgList.length != 0) {
						// 	this.imgList = this.imgList.concat(res.tempFilePaths)
						// } else {
						// 	this.imgList = res.tempFilePaths
						// }
						if (side == 0) {
							this.hideFront = true
						} else {
							this.hideBack = true
						}
						this.imgList[side] = res.tempFilePaths
						//上传图片文件	
						// console.log(res.tempFiles)
						const fileName = this.GetFileName(res.tempFilePaths[0])
						// console.log(fileName)
						// if (side == 0) {
						const formData = this.GetFileForm(fileName, side)
						uploadIdCard(res.tempFilePaths[0], formData).then(res => {
							const data = JSON.parse(res[1].data)
							if (data.Success) {
								this.fileList[0] = data.Data.fileName
								this.$emit("upload", this.fileList)

								if (side == 0) {
									console.log(data.Data.card)
									this.$emit("idCard", data.Data.card)
								}
							} else {
								uni.showToast({
									title: "请上传正确图片",
									icon: "none"
								})
								this.funRemoveImg(side)
							}
						})
						// } else {
						// 	uploadImg(res.tempFilePaths[0]).then(res => {
						// 		const data = JSON.parse(res[1].data)
						// 		this.fileList[1] = data.Data.fileName
						// 		this.$emit("upload", this.fileList)
						// 	})
						// }
					}
				});
			},
			handleRemove(e) {
				const index = e.currentTarget.dataset.index
				this.funRemoveImg(index)
			},
			funRemoveImg(index) {
				this.imgList.splice(index, 1, '')
				console.log(this.imgList)
				if (index == 0) {
					this.hideFront = false
				} else {
					this.hideBack = false
				}
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

	.card-img {
		position: relative;
		overflow: hidden;
	}

	.card-img .close-box {
		position: absolute;
		height: 2rem;
		width: 2rem;
		background-color: #fff;
		transform: rotate(45deg);
		top: -1rem;
		right: -1rem;
	}

	.close-box span {
		position: absolute;
		bottom: 0;
		display: block;
		width: 2rem;
		text-align: center;
		transform: rotate(-45deg);
	}
	.cu-load::before{
		display: block;
	}
</style>
