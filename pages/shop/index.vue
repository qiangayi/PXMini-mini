<template>
	<view>
		<scroll-view scroll-y class="page">
			<image src="@/static/score-banner.png" mode="widthFix" class="response"></image>
			<commondity :commodityData="commodityData" @click="navigate"></commondity>
		</scroll-view>
	</view>
</template>
<script>
	import commondity from '@/components/shop/commodity.vue'
	import {range} from '@/api/shop.js'

	export default {
		data() {
			return {
				commodityData: []
			}
		},
		components: {
			commondity
		},
		onLoad() {
				this.initInfo()
		},
		methods: {
			initInfo() {
				uni.showLoading({
					title: '加载中'
				});
				range().then(res => {
					uni.hideLoading();
					res = res.data
					if (res.Success) {
						this.commodityData = res.Data.map((item) => {
							item.Url = this.golbal_getImgUrl(item.ImgFile)
							return item
						})
					} else {
						uni.showToast({
							title: res.Msg,
							icon: "none"
						})

					}
				})
			},
			navigate(data){
				const url = "/pages/shop/commodity?id=" + data.Id
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>

</style>
