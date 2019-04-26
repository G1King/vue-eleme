import Vue from 'vue'

Vue.filter('imageFilter', function(path) {
  if (!path) return ''
  return 'https://fuss10.elemecdn.com' + path
})
Vue.filter('newImageFilter', function(path) {
  if (!path) return ''
  return 'http://cangdu.org:8001/img/' + path
})
