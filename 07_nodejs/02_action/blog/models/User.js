/**
 * Created by yang on 2017/3/29.
 */


var mongoose = require('mongoose');
var userSchema = require('../schemas/users');

// 创建User模型
module.exports = mongoose.model('User', userSchema);