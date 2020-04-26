<template>

	<view class="cu-list menu sm-border margin-top-xs">
		<view class="video-menu cu-item" v-for="(item, index) in list" :key="index">
			<view class="content">
				<text class="text-grey">{{item.name}}</text>
			</view>
			<view class="action">
				<text class="cuIcon-playfill"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "courserware",
		data() {
			return {
				list: [{
						name: "课件1"
					},
					{
						name: "课件2"
					},
					{
						name: "课件3"
					},
					{
						name: "课件4"
					},
					{
						name: "课件5"
					},
				]
			}
		}
	}
</script>

<style>
</style>
