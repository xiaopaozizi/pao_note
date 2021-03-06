/**
 * Created by yang on 2017/3/29.
 */


var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');
var Article = require('../models/Article');

// 拦截器
router.use(function (req, res, next){
    if(!req.userInfo.isAdmin){
        // 不是管理员
        res.send('对不起，您走错屋了');
        return;
    }
    next();
});

/*
* 首页
* */
router.get('/', function (req, res, next){
    res.render('admin/index',{
        userInfo : req.userInfo
    });
});

/*
 * 用户列表
 *
 * return
 *  userInfo 登录的信息，包括用户名和id
 *  users   全部用户的信息
 *  count : 一共多少条数据,
 *  size : 每页多少条数据,
 *  pages : 一共有多少页,
 *  page : 当前页数,
 * */
router.get('/user', function (req, res){
    // 查询全部用户
    /*
    * limit(条数) 限制多少条
    * skip(条数)  忽略多少条
    * count() 一共多少条数据
    *
    * 以每页2条为例
    * 页数 limit    skip
    * 1   1~2      0
    * 2   3~4      1
    * 3   5~6      2
    * ...
    * n   2n-1~2n  n-1
    * */
    // 页数，通过url获取
    var page = Number(req.query.page) || 1;
    // 每页多少条
    var size = 2;
    // 一共有多少页
    var pages = 0;
    User.find().count().then(function (count){
        // 一共需要多少页
        pages = Math.ceil(Number(count) / size);
        // 最大页数
        page = Math.min(page, pages);
        // 最小页数
        page = Math.max(page, 1);
        // 要忽略多少条
        var skip = (page - 1) * size;
        User.find().limit(page * size).skip(skip).then(function (users){
            res.render('admin/user_index',{
                userInfo : req.userInfo,
                users : users,
                count : count,
                size : size,
                pages : pages,
                page : page,
                prev : '/admin/user?page=' + (page - 1),
                next : '/admin/user?page=' + (page + 1)
            });
        });
    });
});
/*
* 分类管理
*
* */
router.get('/category', function (req, res){
    // 查询全部用户
    /*
     * limit(条数) 限制多少条
     * skip(条数)  忽略多少条
     * count() 一共多少条数据
     *
     * 以每页2条为例
     * 页数 limit    skip
     * 1   1~2      0
     * 2   3~4      1
     * 3   5~6      2
     * ...
     * n   2n-1~2n  n-1
     * */
    // 页数，通过url获取
    var page = Number(req.query.page) || 1;
    // 每页多少条
    var size = 2;
    // 一共有多少页
    var pages = 0;
    Category.find().count().then(function (count){
        // 一共需要多少页
        pages = Math.ceil(Number(count) / size);
        // 最大页数
        page = Math.min(page, pages);
        // 最小页数
        page = Math.max(page, 1);
        // 要忽略多少条
        var skip = (page - 1) * size;

        // sort排序
        // 升序 1 默认
        // 降序 -1 id中含有时间戳
        Category.find().sort({ _id : -1 }).limit(page * size).skip(skip).then(function (categories){
            res.render('admin/category_index',{
                userInfo : req.userInfo,
                categories : categories,
                count : count,
                size : size,
                pages : pages,
                page : page,
                prev : '/admin/category?page=' + (page - 1),
                next : '/admin/category?page=' + (page + 1)
            });
        });
    });
});
/*
* 分类添加
*
* */
router.get('/category/add', function (req, res){
    res.render('admin/category_add', {
        userInfo : req.userInfo
    })
});
/*
* 分类添加--提交
* */
router.post('/category/add', function (req, res){
    var name = req.body.name || '';
    // 分类名为空
    if(name === ''){
        res.render('admin/error',{
            userInfo : req.userInfo,
            message : '没有填写分类名'
        });
        return;
    }
    // 该分类名称已经存在
    Category.findOne({
        name : name
    }).then(category => {
        // 存在，跳转页面
        if(category){
            res.render('admin/error', {
                userInfo : req.userInfo,
                message : '该分类名已经存在！！'
            });
            return Promise.reject();
        } else{
            // 不存在，添加
            return new Category({
                name : name
            }).save();
        }
    }).then(function(newInfo){
        if(newInfo){
            res.render('admin/success', {
                userInfo : req.userInfo,
                message : '添加分类成功！！',
                url : '/admin/category'
            })
        }
    });
});
/*
* 修改分类--展示分类信息
* */
router.get('/category/edit', function (req, res){
   // 获取分类_id
    let id = req.query.id || '';
    // 查询
    Category.findOne({
        _id : id
    }).then(function (category){
        if(category){
            res.render('admin/category_edit',{
                userInfo : req.userInfo,
                category : category
            });
        }
    })
});
/*
* 修改分类--提交修改信息
* */
router.post('/category/edit', function (req, res){
   // 获取id,url上的id
    let id = req.query.id || '';
    // post请求的数据
    let name = req.body.name || '';
    // 分类名为空
    if(name === ''){
        res.render('admin/error',{
            userInfo : req.userInfo,
            message : '没有填写分类名'
        });
        return;
    }
    // 查询
    Category.findOne({
        _id : id
    }).then(category => {
        // 如果不存在
        if(!category){
            res.render('admin/error', {
                userInfo : req.userInfo,
                message : '分类名不存在！！',
                url : '/category'
            });
            return Promise.reject();
        } else {
            // 存在的话
            // 是否进行了修改，如果和之前的一致的话
            if( name === category.name ) {
                res.render('admin/success', {
                    userInfo : req.userInfo,
                    message : '修改成功！！',
                    url : '/admin/category'
                });
                return Promise.reject();
            } else {
                // 如果修改的名称和数据库的重复
                return Category.findOne({
                    // _id !== id
                    _id : {
                        $ne : id
                    },
                    name : name
                })
            }
        }
    }).then(sameCategory => {
        if(sameCategory){
            res.render('admin/error', {
                userInfo : req.userInfo,
                message : '修改类型名称已经存在！！'
            });
            return Promise.reject();
        } else {
            // 修改后的类型名称在数据中并不存在
            // 条件 + 修改数据
            return Category.update({
                _id : id},{
                name : name
            });
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo : req.userInfo,
            message : '修改类型成功！！',
            url : '/admin/category'
        });
    });

});
/*
* 分类删除
* */
router.get('/category/delete', (req, res) => {
   // 获取url上的id
    let id = req.query.id;
    Category.findOne({
        _id : id
    }).then(category => {
        // 存在
        if(category){
            // 删除
            return new Category({
                _id : id
            }).remove();
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo : req.userInfo,
            message : '类型删除成功！！！',
            url : '/admin/category'
        });
    });
});

/*
 * 文章管理
 *
 * */
router.get('/article', function (req, res){
    // 查询全部用户
    /*
     * limit(条数) 限制多少条
     * skip(条数)  忽略多少条
     * count() 一共多少条数据
     * sort({ _id : 1}) 排序
     * populate(['cateogry', 'user']) 获取关联数据
     * 以每页2条为例
     * 页数 limit    skip
     * 1   1~2      0
     * 2   3~4      1
     * 3   5~6      2
     * ...
     * n   2n-1~2n  n-1
     * */
    // 页数，通过url获取
    var page = Number(req.query.page) || 1;
    // 每页多少条
    var size = 2;
    // 一共有多少页
    var pages = 0;
    Article.find().count().then(function (count){
        // 一共需要多少页
        pages = Math.ceil(Number(count) / size);
        // 最大页数
        page = Math.min(page, pages);
        // 最小页数
        page = Math.max(page, 1);
        // 要忽略多少条
        var skip = (page - 1) * size;

        // sort排序
        // 升序 1 默认
        // 降序 -1 id中含有时间戳
        Article.find().sort({ _id : -1 }).populate(['category', 'user'])
            .limit(page * size).skip(skip).then(function (articles){
            res.render('admin/article_index',{
                userInfo : req.userInfo,
                articles : articles,
                count : count,
                size : size,
                pages : pages,
                page : page,
                prev : '/admin/article?page=' + (page - 1),
                next : '/admin/article?page=' + (page + 1)
            });
        });
    });
});
/*
 * 文章添加
 *
 * */
router.get('/article/add', function (req, res){

    // 查找所以的分类
    Category.find().sort({ _id : -1 }).then(categories => {
        res.render('admin/article_add', {
            userInfo : req.userInfo,
            categories:categories
        });
    });

});
/*
* 添加文章--post
* */
router.post('/article/add', function (req, res){

    // 用req.body获取post数据
    let category = req.body.category || '';
    let title = req.body.title || '';
    let description = req.body.description || '';
    let content = req.body.content || '';

    if(title === ''){
        res.render('admin/error', {
            userInfo : req.userInfo,
            message : '文章标题不得为空！！'
        });
        return;
    }
    new Article({
        category : category,
        user : req.userInfo,
        title : title,
        description : description,
        content : content
    }).save().then(article => {
        if(article){
            res.render('admin/success', {
                userInfo : req.userInfo,
                message : '添加成功',
                url : '/admin/article'
            })
        }
    });

});
/*
* 修改文章--get
* */
router.get('/article/edit', (req, res) => {
    // 通过req.query获取文章的id
    let id = req.query.id || '';
    if(id === '') {
        res.render('admin/error', {
            userInfo : req.userInfo,
            message : '文章ID不得为空！！'
        });
        return;
    }
    // 分类信息
    Category.find().then(categories => {
       if(categories){
           // 查找对应ID的文章
           Article.findOne({
               _id : id
           }).populate(['category']).then(article => {
               console.log(article);
               if(article){
                   res.render('admin/article_edit', {
                       userInfo : req.userInfo,
                       article : article,
                       categories : categories
                   });
               }
           })
       }
    })

})
/*
 * 修改文章--post
 * */
router.post('/article/edit', function (req, res){

    // 用req.body获取post数据
    let id = req.query.id || '';
    let category = req.body.category || '';
    let title = req.body.title || '';
    let description = req.body.description || '';
    let content = req.body.content || '';

    if(title === ''){
        res.render('admin/error', {
            userInfo : req.userInfo,
            message : '文章标题不得为空！！'
        });
        return;
    }
    // 更新
    Article.update({
        _id : id
    },{
        category : category,
        title : title,
        description : description,
        content : content
    }).then( rs => {
        if(rs){
            res.render('admin/success', {
                userInfo : req.userInfo,
                message : '更新成功',
                url : '/admin/article'
            });
        }
    });

});
/*
* 删除文章
* */
router.get('/article/delete', (req, res) => {
    let id = req.query.id;
    Article.remove({
        _id : id
    }).then(rs => {
        if(rs){
            res.render('admin/success', {
                userInfo : req.userInfo,
                message : '删除成功',
                url : '/admin/article'
            });
        }
    });
});
// 导出
module.exports = router;