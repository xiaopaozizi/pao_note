/**
 * Created by yang on 2017/3/28.
 */

var projectData = {
    name : 'xiaopaozizi',
    fileData : [
        {
            name : 'css',
            type : 'dir'
        },
        {
            name : 'js',
            type : 'dir'
        },
        {
            name : 'image',
            type : 'dir'
        },
        {
            name : 'index.html',
            type : 'file',
            content : `
                <html>\r\n
                    <head>\r\n
                        <title>我是title</title>\r\n
                    </head>\r\n
                    <body>我是自定义内容</body>\r\n
                </html>
            `
        }
    ]
};


// 引入文件模块
var fs = require('fs');
var projectName = projectData.name;
// 判断工程是否存在
if (projectName) {
    // 创建工程名
    fs.mkdirSync(projectName);
    // 判断子目录是否存在
    var fileData = projectData.fileData;
    if(fileData && Array.isArray(fileData)){
        // 遍历
        fileData.forEach(function (file){
            var path = projectName + '/' + file.name;
            switch (file.type){
               case 'dir':
                   fs.mkdirSync(path);
                   break;
               case 'file':
                   fs.writeFileSync(path, file.content,'utf-8');
                   break;
            }
        });
    }

}

