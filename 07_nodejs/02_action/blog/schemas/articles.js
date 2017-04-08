/**
 * Created by yang on 2017/3/29.
 */


var mongoose = require('mongoose');

// 文章的表结构
var categorySchema = new mongoose.Schema({

    // 关联分类的ID
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Article'
    },

    // 文章标题
    title : String,
    // 简介
    description : String,
    // 具体内容
    content : String

});
// 导出表结构，在models模型中会被使用到
module.exports = categorySchema;