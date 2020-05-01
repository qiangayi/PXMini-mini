<template>
	<view>
		<scroll-view scroll-y class="page padding-lr">
			<view class="flex align-center justify-center">
				<video id="myVideo" :src="videoSrc" :show-play-btn="false" :show-center-play-btn="false" @ended="handleEnded"
				 @timeupdate="handleTimeUpdate" :enable-progress-gesture="false" :controls="false"></video>
			</view>
			<view class="margin-tb-sm text-center">
				<button class="cu-btn round line-blue" @tap="playVideo()">播放</button>
				<button class="cu-btn round line-blue" v-if="rapidAuth" @tap="handleRapidPlay(true)">倍速播放</button>
				<button class="cu-btn round line-blue" v-if="rapidAuth" @tap="handleRapidPlay(false)">普通播放</button>
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
	import {
		getVideo
	} from "@/api/subject.js"
	import {
		mapGetters,
		mapState
	} from 'vuex';
	import {
		recordWatch
	} from "@/api/user.js"

	export default {
		data() {
			return {
				videoRoute: '',
				id: 0,
				videoSrc: 0,
				TabCur: 0,
				rapidPlay: false,
				tabData: [{
						name: '课件'
					},
					{
						name: '问答'
					}
				],
				//间隔时间
				intervalTime: 10,
				intervalId: 0,
				videoContext: "",
				currentTime: 0,
				duration: 0
			}
		},
		computed: {
			...mapGetters(["rapidAuth", "archiveAuth"])
		},
		components: {
			courseware,
			question: askList
		},
		onLoad: function(option) {
			this.id = option.id
			this.initInfo()
			this.videoContext = uni.createVideoContext('myVideo')
			this.videoRoute = this.funGetCurRoute()
		},
		methods: {
			initInfo() {
				const id = this.id
				getVideo({
					id
				}).then(res => {
					res = res.data
					if (res.Success) {
						this.videoSrc = this.golbal_getVideoUrl(res.Data.VideoName)
						// this.videoContext.play()
					}
				})
			},
			playVideo() {
				this.videoContext.play()
				this.intervalRecordPlaying()
			},
			intervalRecordPlaying() {
				const _this = this
				const curRoute = _this.funGetCurRoute();
				console.log("curroute ", curRoute)
				console.log("videoRoute ", _this.videoRoute)
				if (_this.videoRoute != curRoute) {
					return;
				}
				console.log(getCurrentPages())
				_this.intervalId = setTimeout(() => {
					const data = {
						id: _this.id,
						timeLength: parseInt(_this.currentTime),
						videoLength: parseInt(_this.duration)
					}
					console.log(data)
					recordWatch(data).then(res => {
						res = res.data
						console.log(res)
						if (res.Success) {
							_this.intervalRecordPlaying()
							// this.videoContext.play()
						}
					})
				}, _this.intervalTime * 1000)
			},
			handleEnded() {
				clearInterval(this.intervalId)
			},
			handleTimeUpdate({
				detail
			}) {
				const {
					currentTime,
					duration
				} = detail
				this.currentTime = currentTime
				this.duration = duration
				// console.log(currentTime)
				// console.log(duration)
			},
			handleRapidPlay(rapid) {
				if (rapid) {
					this.videoContext.playbackRate(1.5)
				} else {
					this.videoContext.playbackRate(1)
				}
				this.rapidPlay = !rapid
			},
			funGetCurRoute(){
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			return routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
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

	#myVideo {
		width: 100%;
	}
</style>
