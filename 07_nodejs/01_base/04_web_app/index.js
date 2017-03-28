/**
 * Created by yang on 2017/3/28.
 */


// 引入模块
const http = require('http');
// urr模块
const url = require('url');
// 文件模块
const fs = require('fs');
// 解析post/get请求数据
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;
const viewDir = __dirname + '/view';

// 创建服务器
const server = http.createServer();

// 每次接收到一个请求时触发
server.on('request', function(req, res){
    //通过请求参数来路由
    // 判断是post还是get请求
    let method = req.method.toUpperCase();
    let urlData = url.parse(req.url);
    switch(urlData.pathname){
        case "/":
            sendData(viewDir + '/index.html', req, res);
            break;
        case "/course":
            sendData(viewDir + '/course.html', req, res);
            break;
        case "/login":
            sendData(viewDir + '/login.html', req, res);
            break;
        case "/login/check":
            /*
            * 对于get请求，我们可以通过url.parse(req.url)来解析
            *
            * 对于post请求，我们通过req的data和end事件来获取
            * */
            if(method.toUpperCase() === 'GET') {
                var data = querystring.parse(urlData.query);
                var str = `<h1>欢迎${data.username}登录</h1>`;
                res.setHeader('Content-Type', 'text/html');
                res.write(str);
                res.end();
            } else if (method.toUpperCase() === 'POST') {
                var content = '';
                req.on('data', function (chunk){
                    content += chunk;
                });
                req.on('end', function (){
                    content = querystring.parse(content);
                    if(content.username === 'yang'
                        && content.password === 'admin'){
                        sendData(viewDir + '/success.html', req, res);
                    } else {
                        var time = new Date().getTime();
                        sendData(viewDir + '/login.html?' + time, req, res);
                    }
                })
            }
            break;
        default:
            sendData(viewDir + '/404.html', req, res);
            break;
    }

});

function sendData(url,req, res){

    fs.readFile(url, function (err, data) {
        if (!err){
            res.setHeader('Content-Type', 'text/html');
            res.write(data);
            res.end();
        }
    });
}

// 监听端口
server.listen(port, hostname, function () {
    console.log(`服务器正在运行${hostname}::${port}`);
});