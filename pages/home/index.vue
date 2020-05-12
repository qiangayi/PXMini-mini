<template>
	<view>
		<scroll-view scroll-y class="page">
			
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :circular="true" interval="3000" duration="500">
				<swiper-item v-for="item in bannerList" :key="item">
					<image :src="golbal_getBannerPath(item)" mode="widthFix" class="response"></image>
				</swiper-item>
			</swiper>
			<view class="padding-lr ">
				<!-- 当前课程 -->
				<view class="cu-bar solid-bottom">
					<view class="action">
						<!-- <view class="cu-avatar radius lg" :style="'background-image:url(' + item.Url+');'"></view> -->
						<text class="cuIcon-titles text-green"></text>
						<text class="text-df text-bold">当前课程</text>
					</view>
				</view>
				<view class="cu-list grid current-grid" v-if="subjectName == ''" :class="['col-5', 'no-border']">
					<navigator class="cu-item" url="/pages/center/register?claseId=1">
						<view class="cuIcon-favor text-green">
						</view>
						<text>模拟报名</text>
					</navigator>
				</view>
				<view class="cu-list grid current-grid" v-if="subjectName != ''" :class="['col-5', 'no-border']">
					<view class="cu-item" @tap="handleSubClick({Id: subjectId})">
						<image class="cu-avatar lg" :mode="item.mode" :src="golbal_getImgUrl(subjectPic)"></image>
						<text>{{subjectName}}</text>
					</view>
				</view>
				<view class="text-df text-gray text-center padding-tb-sm" v-else><text>当前没有正在学习的课程</text></view>
				<!-- 所有课程 -->
				<view class="cu-bar solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						<text class="text-df text-bold">所有课程</text>
					</view>
				</view>

				<!-- 课程列表 -->
				<subList :list="subData" @click="handleSubClick"></subList>
			</view>

			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import subList from '../../components/subject/subList.vue';
	import {
		mapGetters,
		mapState
	} from 'vuex';
	import {
		getRange
	} from '@/api/subject.js'

	export default {
		data() {
			return {
				bannerList: ['banner1.png', 'banner2.png', 'banner3.png', 'banner4.png', 'banner5.png'],
				subData: []
			};
		},
		components: {
			subList
		},
		watch: {
			subjectId(val) {
				console.log("subjectid", val)
			}
		},
		computed: {
			...mapGetters(['token', 'userName', 'subjectId', 'subjectName', 'subjectPic', 'rapidAuth', 'archiveAuth'])
		},
		onReady() {
			// this.initSubject()
			// console.log("subjectName:", this.subjectName)
			// console.log(this.page.route)
			setTimeout(() => {
				// console.log("rapidAuth: ", this.rapidAuth)
				// console.log("archiveAuth: ", this.archiveAuth)
				// console.log("subjectName:", this.subjectName)
				// console.log("subjectId:", this.subjectId)
				this.initSubject()
			}, 1000)
		},
		methods: {
			initSubject() {
				this.subData = []
				getRange({
					name: ''
				}).then(res => {
					res = res.data
					if (res.Success) {
						// if(res.Data.length > 0){
						// 	res.Data.map(o => {
						// 		console.log("id:", o.Id, "  subid:", this.subjectId)
						// 		if(o.Id != this.subjectId){
						// 			this.subData.push(o)
						// 		}
						// 	})
						// }
						this.subData = res.Data
					}
				})
			},
			handleSubClick(data) {
				if (this.validRegister()) {
					if (this.subjectId == data.Id || this.subjectId == 0) {
						this.navigate(data)
					} else {
						uni.showToast({
							title: '已有正在学习的课程，请完成当前课程后再学习',
							icon: "none",
							duration: 1000
						});
					}
				}
			},
			navigate(data) {
				const url = '/pages/home/subject?id=' + data.Id;
				uni.navigateTo({
					url: url
				});
			},
			navigateToLogin() {
				const url = '/pages/index/login';
				uni.navigateTo({
					url: url
				});
			},
			validRegister() {
				const _this = this;
				if (this.userName == '') {
					uni.showModal({
						title: '温馨提示',
						content: '用户未登陆，是否登陆？',
						success: function(res) {
							if (res.confirm) {
								_this.navigateToLogin();
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					return true
				}
			}
		}
	};
</script>

<style scoped>
	.current-grid {
		background-color: #f1f1f1;
	}

	.cu-list.grid>.cu-item {
		align-items: center;
	}

	.cu-list.menu-avatar>.cu-item .text-gray {
		width: 100%;
	}

	.cu-list.menu-avatar>.cu-item .flex .text-cut {
		max-width: 100%;
	}

	.cu-item {
		margin-top: 10rpx;
	}
</style>
