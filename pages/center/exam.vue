<template>
	<scroll-view scroll-y class="page">
		<view class="action text-xl  padding-tb-sm solid-bottom">
			<!-- <view class="cu-avatar radius lg" :style="'background-image:url(' + item.Url+');'"></view> -->
			<text class="cuIcon-titles text-green"></text>
			<text class="text-bold">{{title}}</text>
		</view>

		<view class='margin-tb-xs' v-for="(item, index) in testList" :key="item.Id">
			<multipleModule v-if="item.Type=='mutiple'" :order="(index + 1)" :title="item.Title" :topicId="item.Id" :options="item.Options"
			 @change="handleAnswerChanged"></multipleModule>
			<radioModule v-if="item.Type=='radio'" :order="(index + 1)" :title="item.Title" :topicId="item.Id" :options="item.Options"
			 @change="handleAnswerChanged"></radioModule>
		</view>

		<view class="box margin-tb">
			<view class="cu-bar btn-group ">
				<button class="cu-btn bg-green shadow-blur lg" :disabled="loading" :loading="loading" @tap="handleSubmit">提交</button>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import multipleModule from "@/components/exam/multipleModule.vue"
	import radioModule from "@/components/exam/radioModule.vue"
	import {testSubmit} from "@/api/teach.js"
	import {
		range
	} from "@/api/exam.js"
	export default {
		data() {
			return {
				id: 0,
				testId: 0,
				title: '',
				testList: [],
				answerList: [],
				loading: false
			}
		},
		components: {
			multipleModule,
			radioModule
		},
		onLoad(option) {
			this.id = option.subId,
				this.initInfo()
		},
		methods: {
			initInfo() {
				uni.showLoading({
					title: '加载中'
				});
				const id = this.id
				range({
					id
				}).then(res => {
					uni.hideLoading();
					res = res.data
					if (res.Success) {
						this.title = res.Data.Title
						this.testId	= res.Data.TestId
						this.testList = res.Data.topicItem
						this.answerList = this.testList.map((item) => {
							return {
								id: item.Id,
								answer: []
							}
						})
						// this.info = res.Data
						// this.subPicUrl = this.golbal_getImgUrl(this.info.Icon)
						// console.log(this.subPicUrl)
					} else {
						uni.showModal({
							title: '提示',
							content: res.Msg,
							showCancel: false,
							success: function(res) {
								uni.navigateBack()
							}
						});

					}
				})
			},
			handleAnswerChanged(ansData) {
				var arr = this.answerList
				const {
					id,
					answer
				} = ansData
				arr.find((item) => {
					if (item.id == id) {
						item.answer = answer
					}

				})
			},
			handleSubmit(){
				this.loading = true
				if(this.valid()){
					this.apiSubmit()
				}
				this.loading = false
			},
			valid(){
				var arr = this.answerList
				const unAnswer = arr.find((item, index) => {
					if(item.answer.length == 0){
						console.log(index)
						uni.showToast({
							title: `第${(index+1)}题未答!`,
							icon: 'none'
						})
						return item
					}
				})
				if(!unAnswer){
					return true
				}
				return false
			},
			apiSubmit(){
				uni.showLoading({
					title: '加载中'
				});
				var data = this.answerList
				var subjectId = this.id
				var testId = this.testId
				testSubmit({data, subjectId, testId}).then(res => {
						res = res.data
						if(res.Success){
							//初始化用户信息
							// this.$store.dispatch('user/initUserInfo', res.Data);
						}
						uni.showToast({
							title: res.Msg,
							success: function(){
								// setTimeout(() => {
								// uni.redirectTo({
								// 	url: '/pages/index/index'
								// });
								// }, 800)
							}
						})
					})
				uni.hideLoading()
			}
		}
	}
</script>

<style>

</style>
