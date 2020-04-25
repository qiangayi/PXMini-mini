<template>
	<view class="bg-white">
		<scroll-view scroll-y class="page padding-lr">
			<image src="@/static/banner.png" mode="widthFix" class="response"></image>
			<view class="solid-bottom">
				<view class="text-lg padding">
					<text class="text-black">课程简介</text>
				</view>
				<view class=" text-df text-indent">
					<text class="text-gray">我于杀戮之中绽放 亦如黎明中的花朵我于杀戮之中绽放 亦如黎明中的花朵我于杀戮之中绽放 亦如黎明中的花朵我于杀戮之中绽放 亦如黎明中的花朵我于杀戮之中绽放
						亦如黎明中的花朵我于杀戮之中绽放 亦如黎明中的花朵我于杀戮之中绽放 亦如黎明中的花朵我于杀戮之中绽放 亦如黎明中的花朵</text>
				</view>
				<view class="flex solid-bottom padding justify-center">
					<button class="cu-btn bg-blue lg shadow">我要报名</button>
				</view>
			</view>
			<view class="padding-top-xs">
				<view class="cu-list menu" :class="sm-border">
					<view  v-for="(item,index) in videoList" :key="index" class=" video-menu cu-item margin-xs">
						<view class="content">
							<text class="text-grey">{{item.name}}</text>
						</view>
						<view class="action">
							<text class="cuIcon-playfill"></text>
						</view>
					</view>
				</view>
			</view>
			
				<text class="text-black">可跳转</text>
			<view class="padding-top-xs">
				
				<view class="cu-list menu" :class="sm-border">
					<navigator class="video-menu cu-item margin-xs" v-for="(item,index) in videoList" :key="index" url="/pages/home/watch" hover-class="navigator-hover">
						<view class="content">
							<text class="text-grey">{{item.name}}</text>
						</view>
						<view class="action">
							<text class="cuIcon-playfill"></text>
						</view>
					</navigator>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoList: [
					{name: "视频1"},
					{name: "视频2"},
					{name: "视频3"},
					{name: "视频4"},
					{name: "视频5"}
				]
			}
		},
		methods: {}
	}
</script>

<style scoped>
	.video-menu {
		background-color: #f0f0f0 !important;
		min-height: 60rpx !important;

	}
</style>
