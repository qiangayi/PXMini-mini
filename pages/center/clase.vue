<template>
	<view>
		<uni-collapse accordion="true">
			<uni-collapse-item :title="clase.claseName" v-for="clase in data" :key="clase.claseName">
				<uni-collapse accordion="true">
					<uni-collapse-item :title="type == 'seller' ? video.videoName : video.videoName  + ' ' + video.complete" v-for="video in clase.videoData" :key="clase.claseName">
						<view class="cu-list menu-avatar ">
							<view class="cu-bar solid-bottom" v-if="type == 'seller'">
								<view class="action">
									<text class="cuIcon-titles text-green"></text>
									<text class="text-lg text-bold">待学习学员</text>
								</view>
							</view>
							<block v-for="stu in video.stuData" :key="stu.Id">
								<view class="cu-item" v-if="type == 'seller' && stu.StartTime == null">
									<view class="content">
										<text class="text-grey text-xl">{{stu.Name}}</text>
									</view>
									<view class="action flex justify-end padding-right-xs">
										<text class="text-grey text-xl">{{stu.Mobile}}</text>
									</view>
								</view>
								<view class="cu-item" v-if="type == 'client'">
									<view class="content">
										<text class="text-grey text-xl">{{stu.Name + "    " + stu.Gender + "    " + stu.Age + "岁 "  }}</text>
									</view>
									<!-- <view class="action flex justify-end padding-right-xs">
										<text class="text-grey text-xl">课程总完成度{{stu.DutyPercent}}</text>
									</view> -->
								</view>
							</block>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</uni-collapse-item>
		</uni-collapse>
		<!-- <block v-for="clase in data" :key="clase.claseName">
				<view class="cu-bar solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						<text class="text-lg text-bold">{{clase.claseName}}</text>
					</view>
				</view>
				<block v-for="video in clase.videoData" :key="stu.Id">

					<view class="cu-bar solid-bottom">
						<view class="action">
							<text class="cuIcon-titles text-green"></text>
							<text class="text-lg text-bold">{{video.videoName + '          ' + video.complete}}</text>
						</view>
					</view>
					<view class="cu-item" v-for="stu in video.stuData" :key="stu.Id">
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
			</block> -->
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import {
		clasesInfo
	} from "@/api/clase.js"
	import {
		mapGetters,
		mapState
	} from 'vuex';
	export default {
		filters: {
			clientInfo(row) {

			}
		},
		data() {
			return {
				type: 'client',
				clases: '',
				data: []
			}
		},
		components: {
			uniCollapse,
			uniCollapseItem
		},
		computed: {
			...mapGetters(['sellerClase', 'clientClase']),

		},
		onLoad(option) {
			this.type = option.type
			if (this.type == 'seller') {
				this.clases = this.sellerClase
			} else {
				this.clases = this.clientClase
			}
			this.initData()
		},
		methods: {
			initData() {
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

	.topInfo {
		height: 140rpx !important;
	}
</style>
