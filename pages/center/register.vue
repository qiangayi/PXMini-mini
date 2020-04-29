<template>
	<view>

		<form>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" data-field='Name' @input="handleInputChange" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">年龄</view>
				<input placeholder="请输入年龄" type="number" data-field='Age' @input="handleInputChange" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<switch class='switch-sex' data-field='Gender' @change="handleInputChange" :class="formData.Gender?'checked':''"
				 :checked="formData.Gender?true:false"></switch>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="请输入手机号码" type="number" data-field='Mobile' @input="handleInputChange"></input>
				<!-- <button class='cu-btn bg-green shadow'>验证码</button> -->
			</view>
			<view class="cu-form-group">
				<view class="title">是否农村户口</view>
				<switch class='switch-sex' data-field='IsRural' @change="handleInputChange" :class="formData.IsRural?'checked':''"
				 :checked="formData.IsRural?true:false"></switch>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="输入框带个按钮" name="input"></input>
			</view> -->

			<uploadImg :title="'身份证上传'" :limit="2" @upload="handleUpload($event,'IdCardPic')"></uploadImg>
			<uploadImg :title="'户口本上传'" :limit="2" @upload="handleUpload($event,'HouseholdRegisterPic')"></uploadImg>
			<uploadImg :title="'失业证上传'" :limit="1" @upload="handleUpload($event,'UnemploymentPic')"></uploadImg>

			<view class="box margin-tb">
				<view class="cu-bar btn-group ">
					<button class="cu-btn bg-green shadow-blur lg" @tap="handleSubmit">注册</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import uploadImg from "@/components/register/uploadImg.vue"
	import {register} from "@/api/user.js"
	export default {
		data() {
			return {
				SwitchC: true,
				formData: {}
			}
		},
		components: {
			uploadImg
		},
		methods: {
			handleInputChange(e) {
				const _this = this
				setTimeout(function() {
					const field = e.target.dataset.field
					_this.formData[field] = e.target.value
				}, 100);
			},
			handleUpload(list,field) {
				if(list.length > 0){
				this.formData[field] = list.join(',')
				}
			},
			handleSubmit() {
				// console.log(this.valid())
				// console.log(this.formData)
				if(this.valid()){
					register(this.formData).then(res => {
						console.log(res)
					})
				}
			},
			valid(){
				const FormData = this.formData
				let res = {success: false, msg: ''}
				if(!FormData.Name || FormData.Name == ''){
					res.msg = '姓名不能为空！'
					return res
				}
				if(!FormData.Age || FormData.Age == ''){
					res.msg = '请输入年龄！'
					return res
				}
				if(!FormData.Mobile || FormData.Mobile == ''){
					res.msg = '请输入手机号码！'
					return res
				}
				if(FormData.Mobile.length != 11){
					res.msg = '手机号码必须为11位！'
					return res
				}
				if(!FormData.IdCardPic || FormData.IdCardPic.split(',').length != 2){
					res.msg = '请上传身份证正反面！'
					return res
				}
				if(FormData.IsRural && !FormData.UnemploymentPic){
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
