<template>
	<view class="cu-list menu-avatar comment solids-top">
		<view class="cu-item margin-top-xs" v-for="item in list" :key="item.Id">
			<view class="content">
				<view class="text-grey">{{item.Name}}</view>
				<view class="text-gray text-content text-df">
					{{item.Content}}
				</view>
				<view class="bg-gray padding-xs radius margin-top-xs text-sm" v-for="child in item.Children" :key="child.Id">
					<view class="flex">
						<view>{{child.Name}}：</view>
						<view class="flex-sub">{{child.Content}}</view>
					</view>
				</view>
				<view class="margin-top-sm flex justify-end">
					<view>
						<text class="text-gray">回复</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "courserware",
		data() {
			return {
				list: [{
						Id: 1,
						Name: "王先生",
						Content: "问题1",
						Children: [{
								Id: 2,
								Name: "李同学",
								Content: "回答1"
							},
							{
								Id: 3,
								Name: "孙同学",
								Content: "回答223"
							},
							{
								Id: 4,
								Name: "赵同学",
								Content: "回答567"
							},
						]
					},
					{
						id: 2,
						Name: "王先生",
						Content: "问题1",
						Children: [{
								id: 2,
								Name: "李同学",
								Content: "回答1"
							},
							{
								id: 3,
								Name: "孙同学",
								Content: "回答223"
							},
							{
								id: 4,
								Name: "赵同学",
								Content: "回答567"
							},
						]
					}
				]
			}
		}
	}
</script>

<style scoped>
	.cu-list.menu-avatar.comment>.cu-item{
		padding-left: 30rpx;
	}
</style>
