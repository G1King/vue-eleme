/*
 * @Author: Leo 
 * @Date: 2019-04-10 17:03:14 
 * @Last Modified by: Leo
 * @Last Modified time: 2019-04-16 17:26:19
 */

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer:{
open:true,
 
},
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      },
      sass:{
        data: `@import "@/style/mixin.scss";@import "@/style/common.scss";`
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

          config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
          //const svgRule = config.module.rule('svg')
          //svgRule.uses.clear()
          config.module
            .rule('svg-sprite-loader')
            .test(/.svg$/)
            .include
            .add(resolve('src/assets/icons/svg')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
              symbolId: 'icon-[name]'
            })
            const fileRule = config.module.rule('file')
            fileRule.uses.clear()
            fileRule
              .test(/\.svg$/)
              .exclude.add(path.resolve(__dirname, 'src/assets/icons/svg'))
              .end()
              .use('file-loader')
              .loader('file-loader')
  }
}
