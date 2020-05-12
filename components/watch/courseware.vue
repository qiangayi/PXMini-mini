<template>

	<view class="cu-list menu sm-border margin-top-xs">
		<view class="video-menu cu-item" v-for="(item, index) in fileData" :key="index">
			<view class="content">
				<text class="text-grey">{{item.Title}}</text>
			</view>
			<view class="action">
				<text class="cuIcon-playfill" @tap="handleOpenClick(item.AnnexId)"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "courserware",
		props:{
			fileData: {
				type: Array,
				default: function(){
					return []
				}
			}
		},
		data() {
			return {
			}
		},
		methods:{
			handleOpenClick(file){
				this.openFile(file)
				this.$emit("click")
			},
			async openFile(file){
				const url = this.golbal_getFileUrl(file)
				console.log(url)
				uni.downloadFile({
				  url: url,
				  success: function (res) {
				    var filePath = res.tempFilePath;
				    uni.openDocument({
				      filePath: filePath,
				      success: function (res) {
				        console.log('打开文档成功');
				      }
				    });
				  }
				});
			}
		}
	}
</script>

<style>
</style>
