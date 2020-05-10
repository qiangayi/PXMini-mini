<template>
	<view>
		<scroll-view scroll-y class="page padding-lr">
			<view class="action text-xl  padding-tb-sm solid-bottom">
				<!-- <view class="cu-avatar radius lg" :style="'background-image:url(' + item.Url+');'"></view> -->
				<text class="cuIcon-titles text-green"></text>
				<text class="text-bold">{{video.Title}}</text>
			</view>
			<view class="flex align-center justify-center">
				<video id="myVideo" :src="videoSrc" :initial-time="startTime" :show-play-btn="false" :show-center-play-btn="false" @ended="handleEnded"
				 @timeupdate="handleTimeUpdate" :enable-progress-gesture="false" :controls="false"></video>
			</view>
			<view class="margin-tb-sm text-center">
				<button class="cu-btn round line-blue" @tap="playVideo()">播放</button>
				<button class="cu-btn round line-blue" v-if="archiveAuth" @tap="playVideoLastTime()">接上次播放</button>
				<button class="cu-btn round line-blue" v-if="rapidAuth" @tap="handleRapidPlay(true)">倍速播放</button>
				<button class="cu-btn round line-blue" v-if="rapidAuth" @tap="handleRapidPlay(false)">普通播放</button>
			</view>
			<!-- https://www.nwedo.net/nsp/StreamingAssets/Movie/1.mp4 -->

			<view class="cu-form-group align-start">
				<view class="title">提问</view>
				<textarea maxlength="-1" data-field='question' @input="handleInputChange" v-model="formData.question" placeholder="请用一句话描述你的问题"></textarea>
			</view>
			<view class="flex align-end justify-end padding-tb-sm">
				<button class="cu-btn bg-green" @tap="handleAskSubmit">提交</button></view>
			<view class="padding-tb-xs">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in tabData" :key="index"
						 @tap="tabSelect" :data-id="index">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
				<!-- 课件 -->
				<courseware :fileData="fileList" v-if='TabCur == 0'></courseware>

				<!-- 问答 -->
				<question :askData="askList" v-if='TabCur == 1' @reply="handleReply"></question>
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
		range as askRange,
		addAsk,
		addReply
	} from "@/api/teach.js"
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
				video: '',
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
				formData: {
					question: ""
				},
				//间隔时间
				intervalTime: 10,
				startTime: 0,
				intervalId: 0,
				videoContext: "",
				currentTime: 0,
				duration: 0,
				fileList: [],
				askList: [],
				watchInfo: {}
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
			setTimeout(() => {
				this.apiAskRange()
			}, 1500)
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
						const {
							Files,
							Video,
							Watch
						} = res.Data
						this.setVideoInfo(Video)
						this.fileList = Files
						this.watchInfo = Watch
						// this.videoContext.play()
					}
				})
			},
			apiAskRange() {
				askRange({
					id: this.id
				}).then(res => {
					res = res.data
					if (res.Success) {
						this.askList = res.Data
						// const {
						// 	Files,
						// 	Video,
						// 	Watch
						// } = res.Data
						// this.setVideoInfo(Video)
						// this.fileList = Files
						// this.videoContext.play()
					}
				})
			},
			playVideo() {
				this.videoContext.play()
				this.intervalRecordPlaying()
			},
			playVideoLastTime(){
				const lastTime = this.watchInfo.WatchTime
				this.startTime = lastTime
				this.playVideo()
			},
			setVideoInfo(video) {
				this.video = video
				this.videoSrc = this.golbal_getVideoUrl(video.VideoName)
			},
			//定时记录播放时间
			intervalRecordPlaying() {
				const _this = this
				const curRoute = _this.funGetCurRoute();
				//未处于视频页面取消当前定时
				if (_this.videoRoute != curRoute) {
					return;
				}
				_this.intervalId = setTimeout(() => {
					const data = {
						id: _this.id,
						timeLength: parseInt(_this.currentTime),
						videoLength: parseInt(_this.duration)
					}
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
			handleInputChange(e) {
				const _this = this
				setTimeout(function() {
					const field = e.target.dataset.field
					_this.formData[field] = e.target.value
				}, 100);
			},
			handleAskSubmit() {
				if (this.formData.question == '') {
					uni.showToast({
						title: '请输入提问内容',
						icon: "none",
						duration: 1000
					});
					return false
				}
				this.apiAddAsk()
			},
			handleReply(data){
				data.id = this.id
				this.apiAddReply(data)
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
			apiAddAsk() {
				var data = {
					id: this.id,
					value: this.formData.question
				}
				uni.showLoading({
					title: '加载中'
				});
				addAsk(data).then(res => {
					uni.hideLoading();
					res = res.data
					if (res.Success) {
						//初始化用户信息
						this.formData.question = ''
						this.apiAskRange()
					}
					uni.showToast({
						title: res.Msg,
						icon: "none",
						duration: 1000
					});
				})
			},
			apiAddReply(data) {
				uni.showLoading({
					title: '加载中'
				});
				addReply(data).then(res => {
					uni.hideLoading();
					res = res.data
					if (res.Success) {
						//初始化用户信息
						this.apiAskRange()
					}
					uni.showToast({
						title: res.Msg,
						icon: "none",
						duration: 1000
					});
				})
			},
			funGetCurRoute() {
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
