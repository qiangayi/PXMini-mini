<template>
	<view>
		<scroll-view scroll-y class="page">
			<image src="@/static/home-banner.png" mode="widthFix" class="response"></image>
			<view class="">
				<view class="text-xxl padding-xs">
					<text class=" text-red">5积分</text>
				</view>

				<view class="solid-bottom text-xl padding-xs">
					<text class="text-black text-bold">耳机！</text>
				</view>
				<view class="text-df padding-xs">
					<text class="text-grey">音盾很好的耳机！限量50个</text>
				</view>
			</view>

			<view class="cu-bar bg-white tabbar border shop foot">
				<view class="bg-red submit">立即订购</view>
			</view>

			<!-- <view class="nav-list">
				<navigator hover-class="none" :url="'/pages/basics/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view> -->
		</scroll-view>
	</view>
</template>

<script>

	export default {
		data() {
			return {

			}
		},
		methods: {
			navigate(data) {
				const url = "/pages/home/subject?id=" + data.Id
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style scoped>
</style>
