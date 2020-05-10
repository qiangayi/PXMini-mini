<template>
	<view>

		<view :hidden='formData.ClaseId==0' class="action text-xl  padding-tb-sm solid-bottom">
			<!-- <view class="cu-avatar radius lg" :style="'background-image:url(' + item.Url+');'"></view> -->
			<text class="cuIcon-titles text-green"></text>
			<text class="text-bold">{{claseInfo.Name}}线上报名</text>
		</view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" data-field='Name' @input="handleInputChange" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">年龄</view>
				<input placeholder="请输入年龄" type="number" data-field='Age' @input="handleInputChange" name="input"></input>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">性别</view>
				<radio-group class="block" data-field='Gender' @change="handleInputChange">
					<label class="padding-lr-xs">
						<radio class='padding-lr-xs' :class="formData.Gender==0?'checked':''" :checked="formData.Gender==0?true:false"
						 :value="0"></radio>男
					</label>
					<label class="padding-lr-xs">
						<radio class='padding-lr-xs' :class="formData.Gender==1?'checked':''" :checked="formData.Gender==1?true:false"
						 :value="1"></radio>女
					</label>
				</radio-group>
			</view> -->
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="请输入手机号码" type="number" data-field='Mobile' @input="handleInputChange"></input>
				<!-- <button class='cu-btn bg-green shadow'>验证码</button> -->
			</view>
			<view class="cu-form-group">
				<view class="title">是否农村户口</view>
				<radio-group class="block" data-field='IsRural' @change="handleInputChange">
					<label class="padding-lr-xs">
						<radio class='padding-lr-xs' :class="formData.IsRural==0?'checked':''" :checked="formData.IsRural==0?true:false"
						 :value="0"></radio>否
					</label>
					<label class="padding-lr-xs">
						<radio class='padding-lr-xs' :class="formData.IsRural==1?'checked':''" :checked="formData.IsRural==1?true:false"
						 :value="1"></radio>是
					</label>
				</radio-group>
			</view>
			<view class="cu-form-group">
				<view class="title">身份证号</view>
				<input placeholder="上传身份证自动识别" v-model='formData.IdCard' data-field='IdCard' @input="handleInputChange"></input>
				<!-- <button class='cu-btn bg-green shadow'>验证码</button> -->
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="输入框带个按钮" name="input"></input>
			</view> -->

			<uploadIdCard :title="'身份证上传'" :limit="2" @idCard='handleIdCard' @upload="handleUpload($event,'IdCardPic')"></uploadIdCard>
			<uploadImg :title="'户口本上传'" :limit="2" @upload="handleUpload($event,'HouseholdRegisterPic')"></uploadImg>
			<uploadImg :title="'失业证上传'" :limit="1" @upload="handleUpload($event,'UnemploymentPic')"></uploadImg>

			<view class="box margin-tb">
				<view class="cu-bar btn-group ">
					<button class="cu-btn bg-green shadow-blur lg" :disabled="loading" :loading="loading" @tap="handleSubmit">注册</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import uploadImg from "@/components/register/uploadImg.vue"
	import uploadIdCard from "@/components/register/uploadIdCard.vue"
	import {
		register
	} from "@/api/user.js"
	import {
		get
	} from "@/api/clase.js"
	import {
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				claseInfo: {},
				SwitchC: true,
				formData: {
					// Gender: 0,
					IsRural: 0,
					ClaseId: 0,
					IdCard: ''
				},
				loading: false
			}
		},
		components: {
			uploadImg,
			uploadIdCard
		},
		onLoad(options) {
			if (options.claseId) {
				this.formData.ClaseId = options.claseId,
					this.init()
			}
		},
		methods: {
			init() {
				const id = this.formData.ClaseId
				uni.showLoading({
					title: "加载中"
				})
				get({
					id
				}).then(res => {
					uni.hideLoading()
					res = res.data
					if (res.Success) {
						this.claseInfo = res.Data
					}
				})
			},
			...mapActions([{
				initUserInfo: 'user/initUserInfo'
			}]),
			handleInputChange(e) {
				const _this = this
				setTimeout(function() {
					const field = e.target.dataset.field
					_this.formData[field] = e.target.value
				}, 100);
			},
			handleUpload(list, field) {
				if (list.length > 0) {
					this.formData[field] = list.join(',')
				}
			},
			handleIdCard(no) {
				console.log(no)
				this.formData.IdCard = no
			},
			handleSubmit() {
				if (this.valid()) {
					this.loading = true
					register(this.formData).then(res => {
						this.loading = false
						res = res.data
						if (res.Success) {
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
						} else {
							uni.showToast({
								title: res.Msg,
								icon: "none"
							})
						}
					})
				}
			},
			valid() {
				const FormData = this.formData
				let res = {
					success: false,
					msg: ''
				}
				if (!FormData.Name || FormData.Name == '') {
					res.msg = '姓名不能为空！'
					return res
				}
				if (!FormData.Age || FormData.Age == '') {
					res.msg = '请输入年龄！'
					return res
				}
				if (!FormData.Mobile || FormData.Mobile == '') {
					res.msg = '请输入手机号码！'
					return res
				}
				if (FormData.Mobile.length != 11) {
					res.msg = '手机号码必须为11位！'
					return res
				}
				if (!FormData.IdCardPic || FormData.IdCardPic.split(',').length != 2) {
					res.msg = '请上传身份证正反面！'
					return res
				}
				if (FormData.IsRural && !FormData.UnemploymentPic) {
					res.msg = '非城镇户口请上传失业证！'
					return res
				}
				res.success = true
				return res
			}
		}
	}
</script>

<style scoped>
	.cu-form-group .title {
		min-width: calc(3rem + 15px);
	}
</style>
