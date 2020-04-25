<template>
	<view>
		<scroll-view scroll-y class="page">
			<image src="@/static/banner.png" mode="widthFix" class="response"></image>
			<view class="padding-lr ">
				<!-- 当前课程 -->
				<view class="cu-bar solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						<text class="text-df text-bold">当前课程</text>
					</view>
				</view>
				<view class="cu-list grid current-grid" :class="['col-5','no-border']">
					<view class="cu-item">
						<view :class="['cuIcon-cardboardfill','text-red']">
						</view>
						<text>母婴</text>
					</view>
				</view>
				<!-- 所有课程 -->
				<view class="cu-bar solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						<text class="text-df text-bold">所有课程</text>
					</view>
				</view>
				<view class="cu-list menu-avatar">
					<navigator class="cu-item " url="/pages/home/subject" hover-class="navigator-hover">
							<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
							<view class="content">
								<view class="text-black">
									<view class="text-cut">莫甘娜</view>
								</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">凯尔，你被自己的光芒变的盲目你被自己的光芒变的盲目你被自己的光芒变的盲目你被自己的光芒变的盲目你被自己的光芒变的盲目！</view>
								</view>
						</view>
					</navigator>
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
	.current-grid {
		background-color: #f1f1f1;
	}

	.cu-list.menu-avatar>.cu-item .text-gray {
		width: 100%
	}

	.cu-list.menu-avatar>.cu-item .flex .text-cut {
		max-width: 100%;
	}

	.cu-item {
		margin-top: 10rpx;
	}
</style>
