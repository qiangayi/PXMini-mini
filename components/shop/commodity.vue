<template>
	<view class="cu-list menu-avatar ">
			<view class="cu-item" url="/pages/home/subject" hover-class="navigator-hover" v-for="item in commodityData" :key="item.Id"  @tap="handleClick(item)">
				<view class="cu-avatar xl" :style="'background-image:url(' + item.Url+');'"></view>
				<view class="content">
					<view class="text-black text-lg">
						<view class="text-cut">{{item.Name}}</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">{{item.Directions}}</view>
					</view>
					<view class="text-red text-df flex">
						<view class="text-cut">{{item.Price}}学分</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		name: "courserware",
		props:{
			commodityData: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {}
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
		left: 170rpx;
		width: calc(100% - 120rpx - 70rpx);

	}
	.cu-list.menu-avatar>.cu-item{
		height: 180rpx;
	}
</style>
