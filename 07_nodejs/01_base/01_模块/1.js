/*
* 每个文件都是一个模块，每个模块都有自己的作用域
*
* global 可建立全局变量
*
* __filename 当前文件被解析的绝对路径
*
* require(模块路径) 模块加载系统
*   ①路径问题 绝对路径相对路径要完善，如果直接写文件名，则回去node_module下查找
*   ②查找机制 文件名->.js->.json->.node->报错
* */

var a = 100;
global.a = 200;

console.log('我是1.js下的a:' + a);
console.log( __filename );


// 引入2.js
require('./2.js');


