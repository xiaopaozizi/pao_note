/**
 * Created by yang on 2017/3/29.
 */


var express = require('express');
var router = express.Router();
// 引入models/User.js来操作数据，从而映射到数据库中去
var User = require('../models/User');
// 数据统一返回格式
var responseData = null;
router.use(function(req, res, next){
    responseData = {
        code : 0,
        message : ''
    }
    next();
});
/*
* 用户注册
* 1.用户名不能为空
* 2.密码不得为空
* 3.两次密码输入要一致
*
* 1.注册用户名不能已存在
* */
router.post('/user/register', function (req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    // 用户名不能为空
    if ( username === '' ) {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        // 返回json数据给客户端
        res.json(responseData);
        return;
    }
    // 密码不能为空
    if ( password === '' ) {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        // 返回json数据给客户端
        res.json(responseData);
        return;
    }
    // 两次密码输入不一致
    if ( password !== repassword ) {
        responseData.code = 3;
        responseData.message = '两次密码输入不一致';
        // 返回json数据给客户端
        res.json(responseData);
        return;
    }
    // 判断注册用户名是否已存在
    // 操作model.js查看文档http://mongoosejs.com/docs/api.html#model_Model.findOne
    // #为类方法，.为对象方法
    /*
    * 查找一条数据
    * param one : 查询条件对象
    * return Promise对象
    * */
    User.findOne({
        username : username
    }).then(function (userInfo){
        // 如果存在，返回错误信息
        if( userInfo ) {
            responseData.code = 4;
            responseData.message = '用户名已存在';
            res.json(responseData);
            return;
        }
        // 不存在的话，直接注册
        var user = new User({
            username : username,
            password : password
        });
        return user.save();
    }).then(function (newUserInfo) {
        // 注册成功
        console.log(newUserInfo);
        responseData.message = '注册成功';
        res.json(responseData);
    });
});


/*
 * 用户登录
 * 1.用户名不能为空
 * 2.密码不得为空
 *
 * 1.用户名和密码不正确
 * */
router.post('/user/login', function (req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    // 用户名不能为空
    if ( username === '' ||  password === '' ) {
        responseData.code = 1;
        responseData.message = '用户名或密码不能为空';
        // 返回json数据给客户端
        res.json(responseData);
        return;
    }
    // 判断注册用户名是否已存在
    // 操作model.js查看文档http://mongoosejs.com/docs/api.html#model_Model.findOne
    // #为类方法，.为对象方法
    /*
     * 查找一条数据
     * param one : 查询条件对象
     * return Promise对象
     * */
    User.findOne({
        username : username,
        password : password
    }).then(function (userInfo){
        // 如果不存在，返回错误信息
        if( !userInfo ) {
            responseData.code = 2;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        // 存在的话
        responseData.message = '登录成功';
        responseData.userInfo = {
            _id : userInfo._id,
            username : userInfo.username,
        };
        // 设置cookies
        req.cookies.set('userInfo', JSON.stringify({
            _id : userInfo._id,
            username : userInfo.username,
        }));
        // 返回数据给客户端
        res.json(responseData);

    });
});

/*
* 用户退出
*
* */
router.get('/user/logout', function (req, res, next){
    req.cookies.set('userInfo', null);
    responseData.message = '退出成功';
    res.json(responseData);
})
// 导出
module.exports = router;