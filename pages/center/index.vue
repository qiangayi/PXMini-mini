<template>
	<view>

		<view class="cu-list menu-avatar ">
			<view class="cu-item " hover-class="navigator-hover">
				<view class="content">
					<view class="text-black text-xxl">
						<view class="text-cut">王大哥</view>
					</view>
				</view>
				<view class="action" @tap="handleClick(item)">
					<button class="cu-btn radius bg-green">签到</button>
				</view>
			</view>

			<!-- 我的任务 -->
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-lg text-bold">我的任务</text>
				</view>
			</view>
			<!-- 任务九宫格 -->
			<view class="cu-list grid col-3 no-border">
				<view class="cu-item" @tap='navigate("exam")'>
					<view class="cuIcon-favor text-green">
					</view>
					<text>在线考试</text>
				</view>
				<view class="cu-item" @tap='navigate("register")'>
					<view class="cuIcon-favor text-green">
					</view>
					<text>报名</text>
				</view>
				<view class="cu-item" @tap='navigate("shop")'>
					<view class="cuIcon-favor text-green">
					</view>
					<text>积分商城</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from 'vuex';
	export default {
		data() {
			return {

			}
		},
		computed:{
			...mapGetters(['subjectId'])			
		},
		methods: {
			navigate(type) {
				let url = ""
				switch (type) {
					case "exam":
					if(this.subjectId == 0){
						uni.showToast({
						    title: '当前没有正在学习的课程！',
							icon: "none",
						    duration: 2000
						});
						return;
					}
						url = "/pages/center/exam?subId=" + this.subjectId
						break;
					case "register":
						url = "/pages/center/register?id=" + 1
						break;
					case "shop":
						url = "/pages/shop/index"
						break;
					default:
						break;
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style scoped>
	.cu-list.menu-avatar>.cu-item .action {
		width: 200rpx
	}

	.cu-list.menu-avatar>.cu-item .content {
		left: 30rpx;
		width: calc(100% - 96rpx - 60rpx - 200rpx);

	}
</style>
