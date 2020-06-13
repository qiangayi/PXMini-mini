<template>
	<view>
		<scroll-view scroll-y class="page padding-lr">
			<view class="action text-xl  padding-tb-sm solid-bottom">
				<!-- <view class="cu-avatar radius lg" :style="'background-image:url(' + item.Url+');'"></view> -->
				<text class="cuIcon-titles text-green"></text>
				<text class="text-bold">{{video.Title}}</text>
			</view>
			<view class="flex align-center justify-center">
				<video id="myVideo" :src="videoSrc" :initial-time="startTime" :show-play-btn="false" :show-center-play-btn="false"
				 @play="handlePlay" @ended="handleEnded" @timeupdate="handleTimeUpdate" @waiting="handleWaiting" @loadedmetadata="handleLoadedmetadata"
				 :enable-progress-gesture="false" :show-progress='false' autoplay controls></video>
			</view>
			<view class="margin-tb-sm text-center">
				<button class="cu-btn round line-blue" @tap="playVideo()">播放</button>
				<button class="cu-btn round line-blue" @tap="pauseVideo()">暂停</button>
				<button class="cu-btn round line-blue" @tap="handleFull()">全屏</button>
			</view>

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
				<courseware :fileData="fileList" @click="handleFileCLick" v-if='TabCur == 0'></courseware>

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
		recordWatch,
		recordTeachFile
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
				intervalTime: 30,
				startTime: 0,
				recordTime: 1,
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
						if (this.archiveAuth) {
							const lastTime = this.watchInfo.WatchTime
							this.startTime = lastTime
							this.recordTime = lastTime + 1
						}
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
					}
				})
			},
			playVideo() {
				this.videoContext.play()
			},
			pauseVideo() {
				this.videoContext.pause()
			},
			handleFull() {
				this.videoContext.requestFullScreen()
			},
			setVideoInfo(video) {
				this.video = video
				this.videoSrc = this.golbal_getVideoUrl(video.VideoName)
			},
			async apiRecordWatch() {
				const data = {
					id: this.id,
					timeLength: parseInt(this.currentTime),
					videoLength: parseInt(this.duration)
				}
				return new Promise((resolve, reject) => {
					recordWatch(data).then(res => {
						res = res.data
						console.log(res)
						if (res.Success) {
							resolve()
						}
					})
				})
			},
			handlePlay() {
				//有权限的默认倍速播放
				if (this.rapidAuth) {
					this.videoContext.playbackRate(1.5)
				}
			},
			handleEnded() {
				clearInterval(this.intervalId)
				this.apiRecordWatch()
				this.recordTime = 1
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
			handleReply(data) {
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
				if (parseInt(currentTime) == this.recordTime) {
					console.log(parseInt(currentTime) + this.intervalTime)
					this.recordTime = parseInt(currentTime) + this.intervalTime
					this.apiRecordWatch()
				}
			},
			handleLoadedmetadata() {
				console.log("load")
			},
			handleWaiting() {
				console.log("waiting")
			},
			handleFileCLick() {
				this.apiRecordFile()
			},
			apiRecordFile() {
				uni.showToast({
					title: '视频课件下载中',
					duration: 2000,
					icon: "none"
				});
				const videoId = this.id
				recordTeachFile({
					videoId
				}).then(res => {})
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
		//全屏按钮
	    video::-webkit-media-controls-fullscreen-button {
	        display: none;
	    }
	    //播放按钮
	    video::-webkit-media-controls-play-button {
	        display: none;
	    }
	    //进度条
	    video::-webkit-media-controls-timeline {
	        display: none;
	    }
	    //观看的当前时间
	    video::-webkit-media-controls-current-time-display{
	        display: none;            
	    }
	    //剩余时间
	    video::-webkit-media-controls-time-remaining-display {
	        display: none;            
	    }
	    //音量按钮
	    video::-webkit-media-controls-mute-button {
	        display: none;            
	    }
	    video::-webkit-media-controls-toggle-closed-captions-button {
	        display: none;            
	    }
	    //音量的控制条
	    video::-webkit-media-controls-volume-slider {
	        display: none;            
	    }
	    //所有控件
	    video::-webkit-media-controls-enclosure{ 
	        display: none;
	    }
</style>
