import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



if(document.documentElement.clientWidth > 500){
  window.alert('请使用手机预览，以保证浏览效果！')
}