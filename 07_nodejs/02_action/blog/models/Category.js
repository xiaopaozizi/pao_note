/**
 * Created by yang on 2017/3/29.
 */


var mongoose = require('mongoose');
var categorySchema = require('../schemas/categories');

// 创建User模型
module.exports = mongoose.model('Category', categorySchema);