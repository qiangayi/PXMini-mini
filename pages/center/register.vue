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
				<input placeholder="上传身份证自动识别" disabled v-model="formData.Name" data-field='Name' @input="handleInputChange" name="input"></input>
			</view>
			<view class="cu-form-group" :hidden="true">
				<view class="title">年龄</view>
				<input placeholder="上传身份证自动识别" disabled v-model="formData.Age" type="number" data-field='Age' @input="handleInputChange"
				 name="input"></input>
			</view>
			<view class="cu-form-group" :hidden="true">
				<view class="title">性别</view>
				<input placeholder="上传身份证自动识别" disabled v-model="formData.GenderStr" data-field='GenderStr' name="input"></input>
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
				<button class='cu-btn bg-green shadow' @tap='handleCode' :disabled='mobileCode!=0 && codeSended'>{{mobileCodeStr}}</button>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="请输入手机接收到的4位验证码" data-field='InvitedCode' @input="handleInputChange" name="input"></input>
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
			<view class="cu-form-group" :hidden="true">
				<view class="title">身份证号</view>
				<input placeholder="上传身份证自动识别" disabled v-model='formData.IdCard' data-field='IdCard' @input="handleInputChange"></input>
				<!-- <button class='cu-btn bg-green shadow'>验证码</button> -->
			</view>

			<uploadIdCard :title="'身份证上传'" :limit="2" @idCard='handleIdCard' @upload="handleUpload($event,'IdCardPic')"></uploadIdCard>
			<uploadImg :title="'户口本上传'" :names="['户主页', '本人页']" :limit="2" @upload="handleUpload($event,'HouseholdRegisterPic')"></uploadImg>
			<uploadImg :title="'失业证上传'" :names="['']" :limit="1" @upload="handleUpload($event,'UnemploymentPic')"></uploadImg>

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
		register,
		mobileCode,
		validCode
	} from "@/api/user.js"
	import {
		registerGetClase
	} from "@/api/clase.js"
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				claseInfo: {},
				SwitchC: true,
				formData: {
					GenderStr: '',
					// Gender: 0,
					IsRural: 1,
					Mobile: '',
					ClaseId: 0,
					IdCard: '',
					InvitedCode: ''
				},
				loading: false,
				//验证码发送状态
				codeSended: false
			}
		},
		components: {
			uploadImg,
			uploadIdCard
		},
		computed: {
			...mapGetters(['mobileCode']),
			mobileCodeStr() {
				if (this.mobileCode == 0) {
					return this.codeSended ? "再次发送" : '发送验证码'
				} else {
					return this.codeSended ? this.mobileCode + '(已发送)' : this.mobileCode
				}
			}
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
					title: "班级加载中"
				})
				registerGetClase({
					id
				}).then(res => {
					uni.hideLoading()
					res = res.data
					if (res.Success) {
						if(res.Code == 1){
							uni.showModal({
							    title: '提示',
							    content: '班级已经关闭！',
								showCancel: false,
							    success: function (res) {
							        if (res.confirm) {
										uni.redirectTo({
											url: '/pages/index/index'
										});
							        } 
							    }
							});
						}
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
			handleIdCard(card) {
				console.log(card)
				this.formData.IdCard = card.CardNo
				this.formData.Name = card.Name
				this.formData.Age = card.Age
				this.formData.GenderStr = card.Gender
			},
			handleCode() {
				setTimeout(() => {
					if(this.validCode()){						
						if (this.mobileCode == 0) {
							this.codeSended = false
							this.$store.dispatch('user/setMobileCode', 30);
							mobileCode({
								phone: this.formData.Mobile
							}).then(res => {
								res = res.data
								if (res.Success) {
									this.codeSended = true
								}
							})
						}
					}
				}, 100)
			},
			handleSubmit() {
				const valid = this.valid()
				if (valid.success) {
					this.loading = true
					this.formData.Gender = this.formData.GenderStr == "男" ? 0 : 1
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
				} else {
					uni.showToast({
						title: valid.msg,
						icon: "none"
					})
				}
			},
			validCode(){				
				if (this.formData.Mobile.length == 0) {
					uni.showToast({
						title: "请输入手机号码",
						icon: "none"
					})
					return false
				}
				if (this.formData.Mobile.length != 11) {
					uni.showToast({
						title: "手机号码必须为11位",
						icon: "none"
					})
					return false
				}
				return true
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
				if ((FormData.GenderStr == '男' && FormData.Age > 60) || (FormData.GenderStr == '女' && FormData.Age > 55)) {
					res.msg = '年龄超标，无法报名！'
					return res
				}
				if (FormData.Mobile.length != 11) {
					res.msg = '手机号码必须为11位！'
					return res
				}
				if (!FormData.IdCardPic || FormData.IdCardPic.split(',').some((item) => {
						console.log(item);
						return item == ''
					})) {
					res.msg = '请上传身份证正反面！'
					return res
				}
				console.log(FormData.HouseholdRegisterPic)
				if (!FormData.HouseholdRegisterPic || FormData.HouseholdRegisterPic.split(',').length < 2 || FormData.HouseholdRegisterPic
					.split(',').some((item) => {
						return item == ''
					})) {
					res.msg = '请上传户口本！'
					return res
				}
				if (!FormData.IsRural && !FormData.UnemploymentPic) {
					res.msg = '城镇户口请上传失业证！'
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
