var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
// 路劲拼接--当前路径的上一层路径下面的dir文件
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 定义入口
  entry: {
    app: './src/main.js'
  },
  // 配置输出相关
  output: {
    // 配置打包目录
    path: config.build.assetsRoot,
    // 打包后的js名称
    filename: '[name].js',
    // 公共文件路劲
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // 不用写的后缀名
    extensions: ['.js', '.vue', '.json', '.css'],
    // 设置别名，用来简写
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // 根目录/src
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        // 后缀名
        test: /\.(js|vue)$/,
        // 检查工具
        loader: 'eslint-loader',
        // 在编译之前对代码进行检查
        enforce: 'pre',
        // 要处理的文件
        include: [resolve('src'), resolve('test')],
        // 如果检查到错误，就进行友好的提示
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // 把vue中的css文件给抽离出来
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 10kb
          limit: 10000,
          // 把图片放在static里面
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
