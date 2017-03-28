/**
 * Created by yang on 2017/3/27.
 */


var a;
var b;

// 开启输入流
process.stdin.resume();

// 提示信息
process.stdout.write('请输入a：');
//监听输入
process.stdin.on('data', function (data) {
    // 如果a不存在，为undefined,即用户没人输入
    if(!a){
        a = Number( data );
        // 提示输入b
        process.stdout.write('请输入b：');
    }else{
        b = Number( data );
        process.stdout.write('a + b = ? 结果是：' + ( a + b ));
    }
})
