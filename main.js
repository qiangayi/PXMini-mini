import Vue from 'vue'
import App from './App'

//注册组件
import home from './pages/home/'
Vue.component('home',home)
import shop from './pages/shop'
Vue.component('shop',shop)
import center from './pages/center'
Vue.component('center',center)

Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
