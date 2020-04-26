<template>
	<view>
		<scroll-view scroll-y class="page">
			<image src="@/static/home-banner.png" mode="widthFix" class="response"></image>
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
				
				<!-- 课程列表 -->
				<subList @click="navigate"></subList>
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
	import subList from '../../components/subject/subList.vue'
	
	export default {
		data() {
			return {

			}
		},
		components:{
			subList
		},
		methods: {
			navigate(data){
				const url = "/pages/home/subject?id=" + data.Id
				uni.navigateTo({
					url: url
				})
			}
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
