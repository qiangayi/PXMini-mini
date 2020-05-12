import Vue from 'vue'
import App from './App'
import store from './store'
import baseUrl from '@/base.js'

//注册组件
import home from './pages/home/'
Vue.component('home', home)
// import shop from './pages/shop'
// Vue.component('shop', shop)
import center from './pages/center'
Vue.component('center', center)

Vue.config.productionTip = false
console.log(baseUrl)
//注册全局变量，获取imgUrl地址
Vue.prototype.golbal_getImgUrl = function(fileName) {
	const url = `${baseUrl}/Upload/img/${fileName}`
	return url
}
Vue.prototype.golbal_getVideoUrl = function(fileName) {
	const url = `${baseUrl}/Upload/video/${fileName}`
	return url
}
Vue.prototype.golbal_getFileUrl = function(fileName) {
	const url = `${baseUrl}/Upload/file/${fileName}`
	return url
}
Vue.prototype.golbal_getBannerPath = function(fileName) {
	const url = `${baseUrl}/img/banner/${fileName}`
	return url
}


App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
