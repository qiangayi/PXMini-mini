<template>
	<view>
		<scroll-view scroll-y class="page">
			<image src="@/static/home-banner.png" mode="widthFix" class="response"></image>
			<view class="padding-lr ">
				<!-- 当前课程 -->
				<view class="cu-bar solid-bottom">
					<view class="action">
						<!-- <view class="cu-avatar radius lg" :style="'background-image:url(' + item.Url+');'"></view> -->
						<text class="cuIcon-titles text-green"></text>
						<text class="text-df text-bold">当前课程</text>
					</view>
				</view>
				<view class="cu-list grid current-grid" v-if="subjectName != ''" :class="['col-5', 'no-border']">
					<view class="cu-item">
						<image class="cu-avatar lg" :mode="item.mode" :src="golbal_getImgUrl('2687441185311555586.png')"></image>
						<text>母婴</text>
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
				<subList @click="handleSubClick"></subList>
			</view>

			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
import subList from '../../components/subject/subList.vue';
import { mapGetters, mapState } from 'vuex';
import {getRange} from '@/api/subject.js'

export default {
	data() {
		return {};
	},
	components: {
		subList
	},
	computed: {
		...mapGetters(['token', 'userName', 'subjectName', 'subjectPic'])
	},
	onReady(){
		this.initSubject()
	},
	methods: {
		initSubject(){
			getRange({name: ''}).then(res => {
				res = res.data
				if(res.Success){
					this.subData = res.Data
				}
			})
		},
		handleSubClick(data) {
			if(this.validRegister()){
				this.navigate(data)
			}
		},
		navigate(data) {
			const url = '/pages/home/subject?id=' + data.Id;
			uni.navigateTo({
				url: url
			});
		},
		navigateToRegister() {
			const url = '/pages/center/register';
			uni.navigateTo({
				url: url
			});
		},
		validRegister() {
			const _this = this;
			if (this.userName == '') {
				uni.showModal({
					title: '温馨提示',
					content: '用户未注册，是否进行注册？',
					success: function(res) {
						if (res.confirm) {
							_this.navigateToRegister();
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}else{
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
.cu-list.grid > .cu-item {
	align-items: center;
}
.cu-list.menu-avatar > .cu-item .text-gray {
	width: 100%;
}

.cu-list.menu-avatar > .cu-item .flex .text-cut {
	max-width: 100%;
}

.cu-item {
	margin-top: 10rpx;
}
</style>
