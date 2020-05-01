<template>
	<view>
		<scroll-view scroll-y class="page padding-lr">
			<video id="myVideo" :src="videoSrc" :show-play-btn="false" :show-center-play-btn="false" :enable-progress-gesture="false" :controls="false"></video>

			<view class="margin-tb-sm text-center">
				<button class="cu-btn round line-blue"  @tap="playVideo()">播放</button>
				<button class="cu-btn round line-blue" if="rapidAuth" @tap="handleRapidPlay(true)">倍速播放</button>
				<button class="cu-btn round line-blue" if="rapidAuth" @tap="handleRapidPlay(false)">普通播放</button>
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
	import {getVideo} from "@/api/subject.js"
	import { mapGetters, mapState } from 'vuex';

	export default {
		data() {
			return {
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
				videoContext: ""
			}
		},
		computed:{
			...mapGetters(["rapidAuth", "archiveAuth"])
		},
		components: {
			courseware,
			question: askList
		},
		onLoad: function(option) {
			console.log(this.rapidAuth)
			this.id = option.id
			this.initInfo()
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			initInfo(){
				const id = this.id
				getVideo({id}).then(res => {
					res = res.data
					if(res.Success){
						this.videoSrc = this.golbal_getVideoUrl(res.Data.VideoName)
						// this.videoContext.play()
					}
				})
			},
			playVideo() {
				this.videoContext.play()
			},
			handleRapidPlay(rapid){
				if(rapid){
					this.videoContext.playbackRate(1.5)
				}else{
					this.videoContext.playbackRate(1)
				}
				this.rapidPlay = !rapid
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
