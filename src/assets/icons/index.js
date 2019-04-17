import Vue from 'vue'
import IconSvg from '@c/Icon-svg'
Vue.component('Icon-svg', IconSvg)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)