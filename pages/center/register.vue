<template>
	<view>

		<form>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="两字短标题" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">年龄</view>
				<input placeholder="两字短标题" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<switch class='switch-sex' @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="输入框带标签" name="input"></input>
				<button class='cu-btn bg-green shadow'>验证码</button>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="输入框带个按钮" name="input"></input>
			</view>

			<uploadImg :title="'身份证上传'" :limit="2"></uploadImg>
			<uploadImg :title="'户口本上传'" :limit="2"></uploadImg>
			<uploadImg :title="'失业证上传'" :limit="1"></uploadImg>

			<view class="box margin-tb">
				<view class="cu-bar btn-group ">
					<button class="cu-btn bg-green shadow-blur lg">注册</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import uploadImg from "@/components/register/uploadImg.vue"
	export default {
		data() {
			return {
SwitchC: true
			}
		},
		components: {
			uploadImg
		},
		methods: {}
	}
</script>

<style scoped>
	.cu-form-group .title {
		min-width: calc(3rem + 15px);
	}
</style>
