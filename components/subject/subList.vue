<template>
	<view class="cu-list menu-avatar ">
			<view class="cu-item " url="/pages/home/subject" hover-class="navigator-hover" v-for="item in list" :key="item.Id">
				<view class="cu-avatar radius lg" :style="'background-image:url(' + item.Url+');'"></view>
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
		data() {
			return {
				list: [{
					Id: 1,
					Url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2375117805,2146028239&fm=11&gp=0.jpg",
					Name: "母婴课程",
					Explanation: "月嫂培训"
				}, {
					Id: 2,
					Url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2375117805,2146028239&fm=11&gp=0.jpg",
					Name: "母婴课程",
					Explanation: "月嫂培训"
				}, {
					Id: 3,
					Url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2375117805,2146028239&fm=11&gp=0.jpg",
					Name: "母婴课程",
					Explanation: "月嫂培训"
				}, {
					Id: 4,
					Url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2375117805,2146028239&fm=11&gp=0.jpg",
					Name: "母婴课程",
					Explanation: "月嫂培训"
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
		width: calc(100% - 96rpx - 60rpx - 200rpx);

	}

	.cu-item {
		margin-top: 10rpx;
	}
</style>
