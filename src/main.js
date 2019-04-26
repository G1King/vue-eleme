import Vue from 'vue'
import './cube-ui'
import App from '@/views/App.vue'
import router from './router'
import store from '@/store/store'
import './common/rem'
import '@/assets/icons/index.js'
import FastClick from 'fastclick'
import ApiServe from '@/serve/request'
import './filter.js'
ApiServe.init()
Vue.config.productionTip = false
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body)
  }, false)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
