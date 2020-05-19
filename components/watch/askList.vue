<template>
	<view class="cu-list menu-avatar comment solids-top">
		<view class="cu-item margin-top-xs" v-for="(item, index) in askData" :key="item.Id">
			<view class="content">
				<view class="text-grey"><!-- {{item.Name}} -->提问：</view>
				<view class="text-gray text-content text-df">
					问：{{item.Question}}
				</view>
				<view class="bg-gray padding-xs radius margin-top-xs text-sm" v-if="item.Answer != ''" >
					<view class="flex">
						<view><!-- {{child.Name}}： --> 回答：</view>
						<view class="flex-sub">{{item.Answer}}</view>
					</view>
				</view>
				<!-- <view class="margin-top-sm flex justify-end">
					<view>
						<text class="text-gray" :hidden="showReplyIndex == index" @tap="HandleReplyClick(index)">回复</text>
					</view>
					<view class="cu-bar input" :hidden="showReplyIndex !== index" style="width: 100%">
						<input class="solid-bottom" :adjust-position="false" v-model="reply" :focus="false" maxlength="300" cursor-spacing="10"></input>
						<button class="cu-btn bg-green shadow" @tap="HandleReplySubmit($event, item.Id)">发送</button>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "courserware",
		props:{
			askData: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				showReplyIndex: -1,
				reply: ''
			}
		},
		methods:{
			HandleReplyClick(index){
				this.reply = ''
				this.showReplyIndex = index
			},
			HandleReplySubmit(e,id){
				if (this.reply == '') {
					uni.showToast({
						title: '请输入回复内容',
						icon: "none",
						duration: 1000
					});
					return false
				}
				const value = this.reply
				this.$emit("reply", {pid: id, value})
				this.showReplyIndex = -1
			}
		}
	}
</script>

<style scoped>
	.cu-list.menu-avatar.comment>.cu-item{
		padding-left: 30rpx;
	}
</style>
