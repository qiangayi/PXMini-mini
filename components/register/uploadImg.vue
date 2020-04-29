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
				<view class="solids" @tap="ChooseImage" v-if="imgList.length < limit">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
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
				fileList: []
			}
		},
		methods: {
			ChooseImage() {
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
						//上传图片文件	
						uploadImg(res.tempFilePaths[0]).then(res => {
							const data = JSON.parse(res[1].data)
							this.fileList.push(data.Data.fileName)
							console.log(this.fileList)
							this.$emit("upload", this.fileList)
						})
					}
				});
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
