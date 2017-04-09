/**
 * Created by yang on 2017/3/29.
 *
 * 程序启动-入口文件
 *
 * 用户发送http请求 -> url -> 解析路由 -> 匹配规则 -> 执行制定的绑定函数，返回数据给用户
 * 静态文件 /public -> 直接读取/public目录下指定的文件
 * 动态路由 -> 处理逻辑，解析模板，加载模板，返回数据给用户
 *
 */


// 加载express模块
var express = require('express');
// 加载swig模块
var swig = require('swig');
// 加载body-parser中间件，用于获取post提交的数据
var bodyParser = require('body-parser');
// 加载mongoose模块
var mongoose = require('mongoose');
// 加载cookies模块
var Cookies = require('cookies');
// 引入models/User
var User = require('./models/User');
// 创建服务器
var app = express();

// 静态文件的托管
// 当用户访问的url以/public开始的，这时候直接返回__dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));



// 解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended : true
}));

// 设置cookies
app.use(function(req,res,next){
    req.cookies = new Cookies(req, res);
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            // 判断是否为管理员
            User.findById(req.userInfo._id).then(function (userInfo){
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            });
        }catch(e){
            next();
        }
    } else {
        next();
    }
});

// 配置模板
// 定义模块引擎，使用swig.renderFile方法解析后缀为.html的文件
app.engine('html', swig.renderFile);
// 设置存放模板的目录
app.set('views', './views');
// 注册模板引擎
app.set('view engine', 'html');
// 开发过程中，关闭模板引擎
swig.setDefaults({
    cache : false
});

/*
* 根据不同功能划分模块
* /     前台
* admin 后台
* api   api---ajax交互的api
* */
app.use('/', require('./routers/main'));
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));


// 连接数据库
// 在连接之前，我们需要（安装）开启服务器

mongoose.connect("mongodb://localhost:27017/blog", function (err){
    if(err){
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        // 监听端口
        app.listen(8888);
    }
});