/**
 * Created by yang on 2017/3/29.
 */


var mongoose = require('mongoose');

// 分类的表结构
var categorySchema = new mongoose.Schema({
    // 分类名称
    name : String,


});
// 导出表结构，在models模型中会被使用到
module.exports = categorySchema;