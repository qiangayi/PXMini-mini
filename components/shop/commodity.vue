<template>
	<view class="cu-list menu-avatar ">
			<view class="cu-item" url="/pages/home/subject" hover-class="navigator-hover" v-for="item in list" :key="item.Id"  @tap="handleClick(item)">
				<view class="cu-avatar xl" :style="'background-image:url(' + item.Url+');'"></view>
				<view class="content">
					<view class="text-black text-lg">
						<view class="text-cut">{{item.Name}}</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">{{item.Directions}}</view>
					</view>
					<view class="text-red text-df flex">
						<view class="text-cut">{{item.Price}}积分</view>
					</view>
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
					Id: 1,
					Url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2375117805,2146028239&fm=11&gp=0.jpg",
					Name: "桔子",
					Directions: "好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子好吃的桔子",
					Price: 6
				}, {
					Id: 2,
					Url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2375117805,2146028239&fm=11&gp=0.jpg",
					Name: "苹果",
					Directions: "好吃的苹果",
					Price: 7
				}, {
					Id: 3,
					Url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2375117805,2146028239&fm=11&gp=0.jpg",
					Name: "香蕉",
					Directions: "好吃的香蕉",
					Price: 8
				}, {
					Id: 4,
					Url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2375117805,2146028239&fm=11&gp=0.jpg",
					Name: "耳机",
					Directions: "音质很清晰",
					Price: 9
				}, ]
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
		left: 170rpx;
		width: calc(100% - 120rpx - 70rpx);

	}
	.cu-list.menu-avatar>.cu-item{
		height: 180rpx;
	}
</style>
