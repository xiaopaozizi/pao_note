// 合并对象
var merge = require('webpack-merge')
// 引入生产环境
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  // 开发环境
  NODE_ENV: '"development"'
})
