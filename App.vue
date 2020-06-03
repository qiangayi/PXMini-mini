<script>
export default {
	onLaunch: function() {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		// this.$store.dispatch('user/login');
		setTimeout(() => {
			this.$store.dispatch('user/login');
		// this.$store.dispatch('user/getSign');
		}, 2000)
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import 'colorui/main.css';
@import 'colorui/icon.css';
page{
	height: 100%;
}
/*每个页面公共css */
</style>
