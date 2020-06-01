<template>
	<view>
		<view class="cu-list menu-avatar ">
		<block v-for="clase in data" :key="clase.ClaseName">
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-lg text-bold">{{clase.ClaseName}}</text>
				</view>
			</view>
			<view class="cu-item" v-for="stu in clase.StuList" :key="stu.Id">
				<template v-if="type == 'seller'">
					<view class="content">
						<text class="text-grey text-xl">{{stu.Name}}</text>
					</view>
					<view class="action flex justify-end padding-right-xs">
						<text class="text-grey text-xl">{{stu.Mobile}}</text>
					</view>
				</template>
				<template v-if="type == 'client'">
					<view class="content">
						<text class="text-grey text-xl">{{stu.Name + " " + stu.Gender + " " + stu.Age + "岁 "  }}</text>
					</view>
					<view class="action flex justify-end padding-right-xs">
						<text class="text-grey text-xl">课程总完成度{{stu.DutyPercent}}</text>
					</view>
				</template>
			</view>
		</block>
	</view>
	</view>
</template>

<script>
	import {clasesInfo} from "@/api/clase.js"
	import {
		mapGetters,
		mapState
	} from 'vuex';
	export	default{
		filters:{
			clientInfo(row){
				
			}
		},
		data(){
			return {
				type: 'client',
				clases: '',
				data: []
			}
		},		
		computed: {
			...mapGetters(['sellerClase', 'clientClase']),
			
		},
		onLoad(option) {
			this.type = option.type
			if(this.type== 'seller'){
				this.clases = this.sellerClase
			}else{
				this.clases = this.clientClase
			}
				this.initData()
		},
		methods: {
			initData(){
				var clases = this.clases
				clasesInfo({
					clases
				}).then(res => {
					res = res.data
					if (res.Success) {
						this.data = res.Data
					}
				})
			}
		}
	}
</script>

<style scoped>
	.cu-list.menu-avatar>.cu-item .action {
		width: 350rpx
	}

	.cu-list.menu-avatar>.cu-item {
		height: 80rpx;
	}

	.cu-list.menu-avatar>.cu-item .content {
		left: 30rpx;
		width: calc(100% - 96rpx - 60rpx - 200rpx);

	}
	
	.topInfo{
		height: 140rpx !important;
	}
</style>
