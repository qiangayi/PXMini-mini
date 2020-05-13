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
				<block v-for="(item,index) in imgList" :key="index">
					<view class="bg-img" @tap="ViewImage" :data-url="imgList[index]" v-if="item != ''">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="handleRemove" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage(index)" :hidden="item != ''">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uploadImg,
		chooseImage
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
		onReady() {
			for(let i = 0; i < this.limit; i++){
				
					this.imgList.push('')
			}
			// this.imgList = this.limit.map(o => {
			// 	return ''
			// })
		},
		methods: {
			ChooseImage(index) {
				chooseImage().then(data => {
					var [err, res] = data
					// if (this.imgList.length != 0) {
					// 	this.imgList = this.imgList.concat(res.tempFilePaths)
					// } else {
					// 	this.imgList = res.tempFilePaths
					// }
					this.imgList[index] = res.tempFilePaths
					//上传图片文件	
					uploadImg(res.tempFilePaths[0]).then(res => {
						const data = JSON.parse(res[1].data)
						this.fileList.push(data.Data.fileName)
						console.log(this.fileList)
						this.$emit("upload", this.fileList)
					})
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			handleRemove(e) {
				const index = e.currentTarget.dataset.index
				this.funRemoveImg(index)
			},
			funRemoveImg(index) {
				this.imgList.splice(index, 1, '')
				if (index == 0) {
					this.hideFront = false
				} else {
					this.hideBack = false
				}
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
