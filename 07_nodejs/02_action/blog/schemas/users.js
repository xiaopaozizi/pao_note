/**
 * Created by yang on 2017/3/29.
 */


var mongoose = require('mongoose');

// 用户的表结构
var userSchema = new mongoose.Schema({
    // 用户名
    username : String,
    //　密码
    password : String,
    // 用户身份，是否为管理员
    isAdmin : {
        type : Boolean,
        default : false
    }

});
// 导出表结构，在models模型中会被使用到
module.exports = userSchema;