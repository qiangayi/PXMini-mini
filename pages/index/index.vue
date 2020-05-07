<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<!-- <shop v-if="PageCur=='shop'"></shop> -->
		<center v-if="PageCur=='center'"></center>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view :class="['action', PageCur=='home'?'text-green':'text-gray']" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<text class="lg cuIcon-home"></text>
				</view>
				<view>主页</view>
			</view>
			<!-- <view :class="['action', PageCur=='shop'?'text-green':'text-gray']"  @click="NavChange" data-cur="shop">
				<view class='cuIcon-cu-image'>
					<text class="lg cuIcon-shop"></text>
				</view>
				<view>积分商城</view>
			</view> -->
			<view :class="['action', PageCur=='center'?'text-green':'text-gray']" @click="NavChange" data-cur="center">
				<view class='cuIcon-cu-image'>
					<text class="lg cuIcon-people"></text>
				</view>
				<view>个人中心</view>
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
				PageCur: "home",
				title: 'Hello'
			}
		},
		computed: {
			...mapGetters(['userName'])
		},
		onLoad() {
		},
		methods: {
			NavChange: function(e) {
				if (this.validRegister()) {
					this.PageCur = e.currentTarget.dataset.cur
				}
			},
			validRegister() {
				const _this = this;
				if (this.userName == '') {
					uni.showModal({
						title: '温馨提示',
						content: '用户未登陆，是否登陆？',
						success: function(res) {
							if (res.confirm) {
								_this.navigateToLogin();
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					return true
				}
			},
			navigateToLogin() {
				const url = '/pages/index/login';
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style scoped>

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
