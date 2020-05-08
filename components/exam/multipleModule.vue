<template>
	<view class="">
		<view class="cu-card article no-card solid-top">
			<view class="cu-item shadow">
				<view class="title bg-white">(多选){{order}}:{{title}}</view>
				<view class="content">
					<view class="desc">
						<checkbox-group class="block" @change="handleCheckboxChange">
							<view class="cu-form-group" v-for="(item, index) in optionData" :key="index">
								<view class="title">{{item}}</view>
								<checkbox class='round' :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false"
								 :value="index"></checkbox>
							</view>
						</checkbox-group>
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
				checkbox: []
			}
		},
		methods: {
			handleCheckboxChange: function(e) {
				const answer = e.detail.value.map((val)  => {
					return Number(val)
				})
				const id = this.topicId;
				this.$emit("change", {id, answer})
			}
		}
	}
</script>

<style scoped>

</style>
