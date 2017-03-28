/**
 * Created by yang on 2017/3/27.
 */


// 开启输入流
process.stdin.resume();

// 监听用户输入

process.stdin.on('data', function (data) {
    console.log('用户输入了：' + data);
})