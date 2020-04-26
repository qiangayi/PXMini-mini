<template>
	<view class="">
		
		<view class="cu-card article no-card solid-top">
			<view class="cu-item shadow">
				<view class="title">题目2：单选</view>
				<view class="content">
				<view class="desc">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-form-group">
							<view class="title">选项1</view>
							<radio class='radio' :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
						</view>
						<view class="cu-form-group">
							<view class="title">选项2</view>
							<radio class='radio' :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
						</view>
					</radio-group>
				</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>
