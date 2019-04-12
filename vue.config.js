/*
 * @Author: Leo 
 * @Date: 2019-04-10 17:03:14 
 * @Last Modified by: Leo
 * @Last Modified time: 2019-04-11 09:48:42
 */

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer:{
open:true
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      },
      sass:{
        data: `@import "@/style/mixin.scss";`
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },
  chainWebpack(config){
    config.resolve.alias
        .set('@c', resolve('src/components'))
        .set('@common', resolve('src/common'))
  }
}
