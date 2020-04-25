<template>
	<view >
		<scroll-view scroll-y class="page padding-lr">
			<image src="@/static/banner.png" mode="widthFix" class="response"></image>
			<view class="padding-top-xs">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in tabData" :key="index"
						 @tap="tabSelect" :data-id="index">
							{{item.name}}
						</view>
					</view>
				</scroll-view>

				<view class="cu-list menu" v-if='TabCur == 0' :class="['sm-border']">
					<view class=" video-menu cu-item margin-xs">
						<view class="content">
							<text class="text-grey">课件</text>
						</view>
						<view class="action">
							<text class="cuIcon-playfill"></text>
						</view>
					</view>
					<view class=" video-menu cu-item margin-xs">
						<view class="content">
							<text class="text-grey">课件</text>
						</view>
						<view class="action">
							<text class="cuIcon-playfill"></text>
						</view>
					</view>
					<view class=" video-menu cu-item margin-xs">
						<view class="content">
							<text class="text-grey">课件</text>
						</view>
						<view class="action">
							<text class="cuIcon-playfill"></text>
						</view>
					</view>
					<view class=" video-menu cu-item margin-xs">
						<view class="content">
							<text class="text-grey">课件</text>
						</view>
						<view class="action">
							<text class="cuIcon-playfill"></text>
						</view>
					</view>
					<view class=" video-menu cu-item margin-xs">
						<view class="content">
							<text class="text-grey">课件</text>
						</view>
						<view class="action">
							<text class="cuIcon-playfill"></text>
						</view>
					</view>
				</view>




				<view class="cu-card dynamic" >
					<view class="cu-item shadow">
						<view class="cu-list comment solids-top">
							<view class="cu-item">
								<view class="content">
									<view class="text-grey">提问：莫甘娜</view>
									<view class="text-gray text-content text-df">
										凯尔，你被自己的光芒变的盲目。
									</view>
									<view class="text-grey">回答：莫甘娜</view>
									<view class="text-gray text-content text-df">
										凯尔，你被自己的光芒变的盲目。
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				
			</view>
		</scroll-view>
	</view>
</template>

<script>
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
				]
			}
		},
		methods: {

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
