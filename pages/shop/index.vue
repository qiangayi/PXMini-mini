<template>
	<view>
		<scroll-view scroll-y class="page">
			<image src="@/static/score-banner.png" mode="widthFix" class="response"></image>
			<commondity @click="navigate"></commondity>
		</scroll-view>
	</view>
</template>
<script>
	import commondity from '@/components/shop/commodity.vue'

	export default {
		data() {
			return {

			}
		},
		components: {
			commondity
		},
		methods: {
			navigate(data){
				const url = "/pages/shop/commodity?id=" + data.Id
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>

</style>
