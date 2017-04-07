/**
 * Created by yang on 2017/3/29.
 */


var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next){
    // 如果有cookies,则传人模板中
    res.render('main/index', {
        userInfo : req.userInfo
    });
})

// 导出
module.exports = router;