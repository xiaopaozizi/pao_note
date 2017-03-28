


/*
* 将js目录下的所以文件，打包合并为resource目录下的index.js文件
*
*
* */
// 文件模块
var fs = require('fs');
// 要打包的文件夹
var packDir = './js';
// 要合并的文件夹
var concatDir = './resource';
// 文件内容
var content = '';

packFile();

function packFile(){
    // 读取js目录下的文件是否存在
    fs.readdir(packDir, 'utf-8', function (err, files){
        if(err){
            console.log('要打包的文件有误');
        } else {
            // 不为空
            if(files.length){
                content = '';
                // 读取文件
                files.forEach(function (file){
                    // 拼接文件目录
                    var file = packDir + '/' + file;
                    // 读取文件内容
                    content += fs.readFileSync(file, 'utf-8') + '\n';

                });
                if(fs.exists(concatDir)){
                    fs.unlink(concatDir);
                }
                // 写入文件
                fs.writeFileSync(concatDir + '/index.js', content, 'utf-8');
            }
        }
    });
}





