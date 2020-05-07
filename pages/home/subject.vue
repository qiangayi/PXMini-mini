<template>
	<view class="bg-white">
		<scroll-view scroll-y class="page padding-lr">
			<image :src="subPicUrl" mode="widthFix" class="response"></image>
			<view class="solid-bottom">
				<view class="text-lg padding">
					<text class="text-black">{{info.Name}}</text>
				</view>
				<view class=" text-df text-indent">
					<text class="text-gray">{{info.Explanation}}</text>
				</view>
				<view class="flex solid-bottom padding justify-center" v-if="subjectId == 0">
					<button class="cu-btn bg-blue lg shadow" :data-id="id" @tap="handleStudyClick">开始学习</button>
				</view>
			</view>

			<!-- <text class="text-black">可跳转</text> -->
			<view class="padding-top-xs">
				<view class="cu-list menu" :class="sm-border">
					<view class="video-menu cu-item margin-xs" v-for="(item,index) in info.Children" :data-id="item.Id" :key="index"
					 @tap="handleVideoClick(item.Id)" hover-class="navigator-hover">
						<view class="content">
							<text class="text-grey">{{item.Title}}</text>
						</view>
						<view class="action">
							<text class="cuIcon-playfill"></text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from 'vuex';
	import {
		getInfo,
	} from "@/api/subject.js"
	import {
		setSub
	} from "@/api/user.js"
	export default {
		data() {
			return {
				id: 0,
				subPicUrl: '',
				info: {
					Id: 0,
					Name: "",
					Icon: "",
					Explanation: "",
					Children: []
				}
			}
		},
		computed: {
			...mapGetters(['subjectId'])
		},
		onLoad(option) {
			console.log(getCurrentPages())
			this.id = option.id
			this.initInfo()
		},
		methods: {
			initInfo() {
				const id = this.id
				getInfo({
					id
				}).then(res => {
					res = res.data
					if (res.Success) {
						this.info = res.Data
						this.subPicUrl = this.golbal_getImgUrl(this.info.Icon)
						console.log(this.subPicUrl)
					}
				})
			},
			handleStudyClick(e) {
				uni.showLoading({
					title: '加载中'
				});
				const id = this.id
				setSub({
					id
				}).then(res => {
					uni.hideLoading();
					res = res.data
					if (res.Success) {
						this.$store.dispatch("user/initSubjectInfo", res.Data)
					}
					uni.showToast({
						title: res.Msg,
						icon: "none",
						duration: 1000
					});
				})
			},
			handleVideoClick(id) {
				if (this.subjectId == 0) {
					uni.showToast({
						title: "请点击开始学习！",
						duration: 1000
					});
					return;
				}
				this.navigateToVideo(id)
			},
			navigateToVideo(id) {
				const url = '/pages/home/watch?id=' + id;
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style scoped>
	.video-menu {
		background-color: #f0f0f0 !important;
		min-height: 60rpx !important;

	}
</style>
