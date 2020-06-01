<template>
	<view>
		<scroll-view scroll-y class="page">
			<image src="@/static/home-banner.png" mode="widthFix" class="response"></image>
			<view class="">
				<view class="text-xxl padding-xs">
					<text class=" text-red">{{info.Price}}学分</text>
				</view>

				<view class="solid-bottom text-xl padding-xs">
					<text class="text-black text-bold">{{info.Name}}</text>
				</view>
				<view class="text-df padding-xs">
					<text class="text-grey">{{info.Directions}}</text>
				</view>
			</view>

			<view class="box margin-tb">
				<view class="cu-bar btn-group ">
					<button class="cu-btn bg-green shadow-blur lg" :disabled="loading" :loading="loading" @tap="handleOrderClick">立即兑换</button>
				</view>
			</view>
			<!-- <view class="cu-bar bg-white tabbar border shop foot">
				<view class="bg-red submit" @tap="handleOrderClick">立即订购</view>
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
	import {
		get,
		addOrder
	} from '@/api/shop.js'
	export default {
		data() {
			return {
				id: 0,
				info: {},
				loading: false
			}
		},
		onLoad(options) {
			this.id = options.id
			this.initInfo()
		},
		methods: {
			initInfo() {
				const id = this.id
				uni.showLoading({
					title: '加载中'
				});
				get({
					id
				}).then(res => {
					uni.hideLoading();
					res = res.data
					if (res.Success) {
						this.info = res.Data
					} else {
						uni.showToast({
							title: res.Msg,
							icon: "none"
						})

					}
				})
			},
			handleOrderClick() {
				this.apiSubmitOrder()
			},
			apiSubmitOrder() {
				const id = this.id
				this.loading = true
				uni.showLoading({
					title: '加载中'
				});
				addOrder({
					commodityId: id
				}).then(res => {
					this.loading = false
					uni.hideLoading();
					res = res.data
					uni.showToast({
						title: res.Msg,
						icon: "none",
						success: function() {
							setTimeout(() => {
								uni.navigateBack()
							}, 800)
						}
					})
				})
			}
		}
	}
</script>

<style scoped>
</style>
