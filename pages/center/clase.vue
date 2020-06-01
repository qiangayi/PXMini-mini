<template>
</template>

<script>
	import {clasesInfo} from "@/api/clase.js"
	import {
		mapGetters,
		mapState
	} from 'vuex';
	export	default{
		data(){
			return {
				type: 'client',
				clases: ''
			}
		},		
		computed: {
			...mapGetters(['sellerClase', 'clientClase'])
		},
		onLoad(option) {
			this.type = option.type
			if(this.type== 'seller'){
				this.clases = this.sellerClase
			}else{
				this.clases = this.clientClase
			}
				this.initData()
		},
		methods: {
			initData(){
				var clases = this.clases
				clasesInfo({
					clases
				}).then(res => {
					res = res.data
					if (res.Success) {
						this.info = res.Data
						this.funDataClassify(this.info.Children)
						this.subPicUrl = this.golbal_getImgUrl(this.info.Icon)
					}
				})
			}
		}
	}
</script>

<style>
</style>
