<template>
	<view class="">
		
		<view class="cu-card article no-card solid-top">
			<view class="cu-item shadow">
				<view class="title">(单选){{order}}:{{title}}</view>
				<view class="content">
				<view class="desc">
					<radio-group class="block" @change="handleRadioChange">
						<view class="cu-form-group" v-for="(item, index) in optionData" :key="index">
							<view class="title">{{item}}</view>
							<radio class='radio' :class="radio==index?'checked':''" :checked="radio==index?true:false" :value="index"></radio>
						</view>
						<!-- <view class="cu-form-group">
							<view class="title">选项2</view>
							<radio class='radio' :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
						</view> -->
					</radio-group>
				</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			order: {
				type: Number,
				default: 1
			},
			title: {
				type: String,
				default: ''
			},
			topicId: {
				type: Number,
				default: 0
			},
			options: {
				type: String,
				default: ''
			}
		},
		mounted() {
			this.optionData = this.options.split("@@")
		},
		data: () => {
			return {
				optionData: [],
				radio: -1
			}
		},
		methods: {
			handleRadioChange: function(e) {
				const answer = [Number(e.detail.value)]
				// const arr = e.detail.value.map((val)  => {
				// 	return Number(val)
				// })
				const id = this.topicId;
				this.$emit("change", {id, answer})
			}
		}
	}
</script>

<style>
</style>
