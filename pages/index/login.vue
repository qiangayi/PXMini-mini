<template>
	<view class="container">
		<form class="flex flex-direction align-center justify-center">
			<view class="cu-bar solid-bottom">
				根据报名时登记的手机号码和身份证绑定微信
			</view>
			<view class="cu-form-group margin-tb radius">
				<view class="title">手机号码</view>
				<input placeholder="请输入手机号码" type="number" data-field='mobile' @input="handleInputChange"></input>
				<!-- <button class='cu-btn bg-green shadow'>验证码</button> -->
			</view>
			<view class="cu-form-group margin-tb radius" :hidden="switchD">
				<view class="title">身份证号</view>
				<input placeholder="请输入身份证号" data-field='idCard' @input="handleInputChange"></input>
				<!-- <button class='cu-btn bg-green shadow'>验证码</button> -->
			</view>
			<view class="flex align-center justify-end">
				<view class="span">学生</view>
				<switch class='switch-rl radius' @change="SwitchD" :class="switchD?'checked':''" :checked="switchD?true:false"></switch>
				<view class="span">教师</view>
			</view>
			<view class="cu-bar btn-group margin-tb">
				<button class="cu-btn bg-blue shadow-green" @tap="navigateToRegster">注册</button>
				<button class="cu-btn bg-green shadow-blur" @tap="handleBind">绑定</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		tchBingWx,
		stuBingWx
	} from "@/api/user.js"
	export default {
		data() {
			return {
				formData: {
					mobile: '',
					idCard: ''
				},
				switchD: false
			}
		},
		methods: {
			SwitchD(e) {
				this.switchD = e.detail.value
			},
			handleBind() {
				if (!this.valid()) {
					return
				}
				const data = this.formData
				if (this.switchD) {
					tchBingWx(data).then(res => {
						res = res.data
						if (res.Success) {
							this.funBindSuccess(res)
						} else {
							uni.showToast({
								title: res.Msg,
								icon: "none"
							})
						}
					})
				} else {
					stuBingWx(data).then(res => {
						res = res.data
						if (res.Success) {
							this.funBindSuccess(res)
						} else {
							uni.showToast({
								title: res.Msg,
								icon: "none"
							})
						}
					})
				}
			},
			funBindSuccess(res) {
				//初始化用户信息
				this.$store.dispatch('user/initUserInfo', res.Data);
				uni.showToast({
					title: res.Msg,
					success: function() {
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/index/index'
							});
						}, 800)
					}
				})
			},
			valid() {
				let res = false
				if (this.formData.mobile.length == 0) {
					uni.showToast({
						title: "手机不能为空",
						icon: "none"
					})
					return res
				}
				if (!this.switchD) {
					//学生再验证身份证
					if (this.formData.idCard.length == 0) {
						uni.showToast({
							title: "身份证不能为空",
							icon: "none"
						})
						return res
					}
				}
				return true
			},
			handleInputChange(e) {
				const _this = this
				setTimeout(function() {
					const field = e.target.dataset.field
					_this.formData[field] = e.target.value
				}, 100);
			},

			navigateToRegster() {
				const url = '/pages/center/register';
				uni.navigateTo({
					url: url
				});
			},
		}
	}
</script>

<style scoped>
	page,
	.container,
	form {
		height: 100%;
	}

	form {
		width: 80%;
		margin: 0 auto;
	}

	.span {
		margin: 0 10rpx
	}
</style>
