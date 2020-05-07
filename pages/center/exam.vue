<template>
	<scroll-view scroll-y class="page">
		<view class="action text-xl  padding-tb-sm solid-bottom">
			<!-- <view class="cu-avatar radius lg" :style="'background-image:url(' + item.Url+');'"></view> -->
			<text class="cuIcon-titles text-green"></text>
			<text class="text-bold">{{title}}</text>
		</view>
		<view v-for="(item, index) in testList" :key="item.Id">
			<multipleModule v-if="item.Type=='mutiple'" :index="(index + 1)" :title="item.Title" :id="item.Id" :options="item.Options"></multipleModule>
			<radioModule v-if="item.Type=='radio'" :index="(index + 1)" :title="item.Title" :id="item.Id" :options="item.Options"></radioModule>
		</view>
	</scroll-view>
</template>

<script>
	import multipleModule from "@/components/exam/multipleModule.vue"
	import radioModule from "@/components/exam/radioModule.vue"
	import {range} from "@/api/exam.js"
	export default {
		data() {
			return {
				id: 0,
				title: '',
				testList: ''
			}
		},
		components: {
			multipleModule,
			radioModule
		},
		onLoad(option){
			this.id = option.subId,
			this.initInfo()
		},
		methods: {
			initInfo(){
				uni.showLoading({
					title: '加载中'
				});
				const id = this.id
				range({id}).then(res => {
					uni.hideLoading();
					res = res.data
					if (res.Success) {
						this.title = res.Data.Title
						this.testList = res.Data.topicItem
						// this.info = res.Data
						// this.subPicUrl = this.golbal_getImgUrl(this.info.Icon)
						// console.log(this.subPicUrl)
					}else{				
						uni.showModal({
						    title: '提示',
						    content: res.Msg,
							showCancel: false,
						    success: function (res) {
								uni.navigateBack()
						    }
						});
						
					}
				})
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
		}
	}
</script>

<style>

</style>
