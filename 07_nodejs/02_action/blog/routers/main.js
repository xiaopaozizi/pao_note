/**
 * Created by yang on 2017/3/29.
 */


let express = require('express');
let router = express.Router();
let Category = require('../models/Category');
let Article = require('../models/Article');
let data = {
    userInfo : null
};
/*
* 将公共的数据抽取成中间件
* 例如分类信息
* */
router.use((req, res, next) => {
    data.userInfo = req.userInfo;
    Category.find().then(categories => {
        data.categories = categories;
        next();
    });
});
/*
* 首页
* */
router.get('/', function (req, res){

    // 文章分类
    data.category = req.query.category || '';
    // 文章
    data.articles = [];
    // 当前页
    data.page = Number(req.query.page) || 1;
    // 总页数
    data.pages = 0;
    // 每页显示多少条数据
    data.size = 2;
    // 分类查询条件
    let where = {};
    // 如果分类不为空
    if(data.category){
        where.category = data.category;
    }
    // 查询分类信息
    Article.where(where).find().count().then(function (count){
        // 一共需要多少页
        data.pages = Math.ceil(Number(count) / data.size);
        // 最大页数
        data.page = Math.min(data.page, data.pages);
        // 最小页数
        data.page = Math.max(data.page, 1);
        // 要忽略多少条
        var skip = (data.page - 1) * data.size;
        // sort排序
        // 升序 1 默认
        // 降序 -1 id中含有时间戳
        return Article.where(where).find().sort({ _id : -1 }).populate(['category', 'user'])
            .limit(data.page * data.size).skip(skip);
    }).then(articles => {
        data.articles = articles;
    }).then(()=>{
        // 如果有cookies,则传人模板中
        res.render('main/index', data);
    });


})
/*
* 文章详情
* */
router.get('/detail', (req, res) => {
    let contentid = req.query.contentid || '';
    Article.findOne({
        _id : contentid
    }).then(article => {
        data.article = article;
        // 阅读量+1
        article.views++;
        article.save();
        res.render('main/detail', data);
    })
});
// 导出
module.exports = router;