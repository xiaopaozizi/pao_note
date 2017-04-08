/**
 * Created by yang on 2017/3/29.
 */


var mongoose = require('mongoose');
var articleSchema = require('../schemas/articles');

// 创建User模型
module.exports = mongoose.model('Article', articleSchema);