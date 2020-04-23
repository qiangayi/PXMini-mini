<template>
	<view>
		<scroll-view scroll-y class="page">
			<image src="@/static/banner.png" mode="widthFix" class="response"></image>
			<view class="padding-lr ">
				<view class="cu-bar solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						<text class="text-df text-bold">当前课程</text>
					</view>
				</view>
			</view>
			<!-- <view class="nav-list">
				<navigator hover-class="none" :url="'/pages/basics/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view> -->
			<view class="cu-tabbar-height"></view>
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

		}
	}
</script>

<style scoped>
</style>
