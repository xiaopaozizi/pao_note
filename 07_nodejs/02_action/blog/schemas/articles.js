/**
 * Created by yang on 2017/3/29.
 */


var mongoose = require('mongoose');

// 文章的表结构
var categorySchema = new mongoose.Schema({

    // 关联Category的_id
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    // 关联User的_id
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    // 发布时间
    addTime : {
        type : Date,
        default : new Date()
    },
    // 阅读量
    views : {
        type : Number,
        default:0
    },
    // 文章标题
    title : {
        type : String,
        default : ''
    },
    // 简介
    description : {
        type : String,
        default : ''
    },
    // 具体内容
    content : {
        type : String,
        default : ''
    },
    // 评论
    comments : {
        type : Array,
        default : []
    }

});
// 导出表结构，在models模型中会被使用到
module.exports = categorySchema;