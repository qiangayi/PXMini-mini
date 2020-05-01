<template>
	<view class="cu-list menu-avatar ">
			<view class="cu-item " url="/pages/home/subject" hover-class="navigator-hover" v-for="item in list" :key="item.Id">
				<view class="cu-avatar radius lg" :style="'background-image:url(' + golbal_getImgUrl(item.Icon)+');'"></view>
				<view class="content">
					<view class="text-black">
						<view class="text-cut">{{item.Name}}</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">{{item.Explanation}}</view>
					</view>
				</view>
				
				<view class="action" @tap="handleClick(item)">
					<button class="cu-btn text-green">开始学习
					<text class="lg text-grey cuIcon-playfill"></text></button>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		name: "courserware",
		props:{
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
			}
		},
		methods:{
			handleClick(item){
                this.$emit("click",item);
			}
		}
	}
</script>

<style scoped>
	.cu-list.menu-avatar>.cu-item .text-gray {
		width: 100%
	}
	.cu-list.menu-avatar>.cu-item .action{
		width: 200rpx
	}

	.cu-list.menu-avatar>.cu-item .flex .text-cut {
		max-width: 100%;
	}
	.cu-list.menu-avatar>.cu-item .content{
		width: calc(100% - 96rpx - 60rpx - 200rpx);

	}

	.cu-item {
		margin-top: 10rpx;
	}
</style>
