<template>
	<view>
		<view class="cu-list menu-avatar ">
			<view class="cu-item topInfo" hover-class="navigator-hover">
				<view class="content">
					<view class="text-black text-xxl">
						<view class="text-xxl">{{userName}}</view>
					</view>
					<view class="text-black text-xl">
						<view class="text-cut">学分：{{score}}</view>
					</view>
					<!-- <view class="text-black text-xl">
						<view class="text-cut">班级：{{claseName}}</view>
					</view>
					<view class="text-black text-xl" v-if='claseSellName != ""'>
						<view class="text-cut">班主任：{{claseSellName}}</view>
					</view> -->
				</view>
				<template>
					<view class="action flex justify-end padding-right-xs">
						<button class="cu-btn radius bg-gray " @tap="handleLogOutClick(item)">退出</button>
					</view>
					<!-- <view :hidden='!signed' class="action flex justify-end padding-right-xs">
						<button class="cu-btn radius bg-gray " disabled>已签到</button>
					</view>
					<view :hidden='signed || loading' class="action flex justify-end padding-right-xs" @tap="handleClick(item)">
						<button class="cu-btn radius bg-green">签到</button>
					</view>
					<view :hidden='signed || !loading' class="action flex justify-end padding-right-xs">
						<button class="cu-btn radius bg-green" loading="">签到中</button>
					</view> -->
				</template>
			</view>
			<template v-if="claseId != 0">
				<view class="cu-bar solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						<text class="text-lg text-bold">班级信息</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey text-xl">班级</text>
					</view>
					<view class="action flex justify-end padding-right-xs">
						<text class="text-grey text-xl">{{claseName}}</text>
					</view>
				</view>
				<view class="cu-item" v-if="claseStart">
					<view class="content">
						<text class="text-grey text-xl">课程时间</text>
					</view>
					<view class="action flex justify-end padding-right-xs">
						<text class="text-grey text-df">{{claseStart}}至{{claseEnd}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey text-xl">班主任</text>
					</view>
					<view class="action flex justify-end padding-right-xs">
						<text class="text-grey text-xl">{{claseSellName}}</text>
					</view>
				</view>
			</template>

			<!-- 我的任务 -->
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-lg text-bold">我的任务</text>
				</view>
			</view>
			<!-- 任务九宫格 -->
			<view class="cu-list grid col-3 no-border">
				<view v-for="item in toolData" :key="item.name" class="cu-item" @tap='navigate(item.target)'>
					<view class="cuIcon-favor text-green">
					</view>
					<text>{{item.name}}</text>
				</view>
				<!-- <view class="cu-item" @tap='navigate("register")'>
					<view class="cuIcon-favor text-green">
					</view>
					<text>报名</text>
				</view> -->
				<!-- <view class="cu-item" :hidden='true' @tap='navigate("shop")'>
					<view class="cuIcon-favor text-green">
					</view>
					<text>积分商城</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		addSign,
		loginOut
	} from '@/api/user.js'
	import {
		mapGetters,
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				loading: false,
				toolData: [
					// {name: "在线考试", target: 'exam'},
					// {name: "", target: ''},
				]
			}
		},
		computed: {
			...mapGetters(['subjectId', 'userName', 'score', 'signed', 'claseId', 'claseStart', 'claseEnd', 'claseName',
				'sellerClase', 'clientClase',
				'claseSellName'
			])
		},
		mounted() {
			if (this.claseId != 0) {
				this.toolData.push({
					name: "在线考试",
					target: 'exam'
				})
				this.toolData.push({
					name: "学分使用",
					target: 'shop'
				})
			}
			if (this.sellerClase != '') {
				this.toolData.push({
					name: "班级资料",
					target: 'claseSeller'
				})
			}
			console.log(this.clientClase)
			if (this.clientClase != '') {
				this.toolData.push({
					name: "查看班级",
					target: 'claseClient'
				})
			}
		},
		methods: {
			navigate(type) {
				let url = ""
				switch (type) {
					case "exam":
						if (this.subjectId == 0) {
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
						url = "/pages/center/register?claseId=" + 1
						break;
					case "shop":
						url = "/pages/shop/index"
						break;
					case "claseSeller":
						url = "/pages/center/clase?type=seller"
						break;
					case "claseClient":
						url = "/pages/center/clase?type=client"
						break;
					default:
						break;
				}
				uni.navigateTo({
					url: url
				})
			},
			handleClick() {
				this.loading = true
				addSign().then(res => {
					res = res.data
					if (res.Success) {
						//初始化用户信息
						this.$store.dispatch('user/setSign');
					}
					uni.showToast({
						title: res.Msg,
						success: function() {}
					})
				})
			},
			handleLogOutClick() {
				uni.showLoading({
					title: '正在退出',
					mask: true
				});
				loginOut().then(res => {
					uni.hideLoading()
					res = res.data
					if (res.Success) {
					
						uni.navigateTo({
							url: '/pages/index/index'
						})
						uni.showLoading({
							title: '加载中',
							mask: true
						});
						//初始化用户信息
						this.$store.dispatch('user/login');
					}
					uni.showToast({
						title: res.Msg,
						success: function() {}
					})
				})
			}
		}
	}
</script>

<style scoped>
	.cu-list.menu-avatar>.cu-item .action {
		width: 350rpx
	}

	.cu-list.menu-avatar>.cu-item {
		height: 80rpx;
	}

	.cu-list.menu-avatar>.cu-item .content {
		left: 30rpx;
		width: calc(100% - 96rpx - 60rpx - 200rpx);

	}

	.topInfo {
		height: 140rpx !important;
	}
</style>
