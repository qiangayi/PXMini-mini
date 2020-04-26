<template>
	<view class="">		
		<view class="cu-card article no-card solid-top">
			<view class="cu-item shadow">
				<view class="title bg-white">题目1：多选</view>
				<view class="content">
					<view class="desc">
						<checkbox-group class="block" @change="CheckboxChange">
							<view class="cu-form-group">
								<view class="title">选项1</view>
								<checkbox class='round' :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A"></checkbox>
							</view>
							<view class="cu-form-group">
								<view class="title">选项2</view>
								<checkbox class='round' :class="checkbox[1].checked?'checked':''" :checked="checkbox[1].checked?true:false"
								 value="B"></checkbox>
							</view>
							<view class="cu-form-group">
								<view class="title">选项3</view>
								<checkbox class='round' :class="checkbox[2].checked?'checked':''" :checked="checkbox[2].checked?true:false"
								 value="C"></checkbox>
							</view>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	
</style>
