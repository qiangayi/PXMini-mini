<template>
	<view>
		<scroll-view scroll-y class="page padding-lr">
			<video id="myVideo" src="https://www.nwedo.net/nsp/StreamingAssets/Movie/1.mp4" :show-play-btn="false" :show-center-play-btn="false" :enable-progress-gesture="false" :controls="false"></video>

			<view class="margin-tb-sm text-center">
				<button class="cu-btn round line-blue"  @tap="playVideo()">播放</button>
			</view>
			<!-- https://www.nwedo.net/nsp/StreamingAssets/Movie/1.mp4 -->
			<view class="padding-top-xs">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in tabData" :key="index"
						 @tap="tabSelect" :data-id="index">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
				<!-- 课件 -->
				<courseware v-if='TabCur == 0'></courseware>

				<!-- 问答 -->
				<question v-if='TabCur == 1'></question>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import courseware from "@/components/watch/courseware.vue"
	import askList from "@/components/watch/askList.vue"

	export default {
		data() {
			return {
				TabCur: 0,
				tabData: [{
						name: '课件'
					},
					{
						name: '问答'
					}
				],
				videoContext: ""
			}
		},
		components: {
			courseware,
			question: askList
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			playVideo() {
				this.videoContext.play()
			},
			tabSelect(e) {
				console.log(this.TabCur == 1)
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style scoped>
	.body {
		height: 100%;
	}

	.video-menu {
		background-color: #f0f0f0 !important;
		min-height: 60rpx !important;

	}
</style>
