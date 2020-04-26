<template>
	<scroll-view scroll-y class="page">
		<text class="text-xxl">母婴测试</text>
		<multipleModule></multipleModule>
		<radioModule></radioModule>
	</scroll-view>
</template>

<script>
	import multipleModule from "@/components/exam/multipleModule.vue"
	import radioModule from "@/components/exam/radioModule.vue"
	export default {
		data() {
			return {
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: true
				}, {
					value: 'C',
					checked: false
				}],
				radio: 'A'
			}
		},
		components: {
			multipleModule,
			radioModule
		},
		methods: {

			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
		}
	}
</script>

<style>

</style>
