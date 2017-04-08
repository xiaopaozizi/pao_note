/**
 * Created by yang on 2017/3/29.
 */


var express = require('express');
var router = express.Router();
var Category = require('../models/Category');

router.get('/', function (req, res, next){

    // 查询分类信息
    Category.find().then(categories => {
        // 如果有cookies,则传人模板中
        res.render('main/index', {
            userInfo : req.userInfo,
            categories: categories,
        });
    });


})

// 导出
module.exports = router;