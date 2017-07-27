/**
 * Created by 小炮子子 on 2017/7/27.
 */
class Queue {
    constructor(){
        this.items = [];
    }

    // 入队---队尾进
    enqueue(item){
        this.items.push(item);
    }

    // 出队---队首出
    dequeue(){
        return this.items.shift();
    }

    // 返回队首的元素---不删除
    front(){
        return this.items[0];
    }

    // 是否为空
    isEmpty(){
        return this.items.length === 0;
    }

    // 队长
    size(){
        return this.items.length;
    }

    // 打印
    print(){
        return this.items.toString();
    }
}


console.log('#########################队列实例#############################')
let queue = new Queue();
queue.enqueue('剑军');
queue.enqueue('老牛');
console.log(queue.front());
console.log(queue.print());
console.log(queue.dequeue());
console.log(queue.isEmpty());
console.log(queue.size());
console.log(queue.print());






console.log('#########################丢手帕#############################')

var names = ['老牛', '何飞', '小徐', '剑军', '飞哥', '小炮子子'];
var total = 3;      // 7次淘汰一个人
/*
* 假设是3次干掉一个人的话
* 第一轮：剑军淘汰      '飞哥', '小炮子子', '老牛', '何飞', '小徐'
* 第二轮：何飞淘汰       '小徐', '飞哥', '小炮子子','老牛',
* 第三轮：老牛淘汰       '小徐', '飞哥', '小炮子子'
* 第四轮：小徐淘汰       '飞哥', '小炮子子'
* 第四轮：小炮子子淘汰       '飞哥'
*
*
* */
(function(arr, total){
    // 创建队列
    let queue = new Queue();
    // 入队
    arr.forEach(item => {
        queue.enqueue(item);
    })
    //console.log(queue.print())
    let who = '';       // 被淘汰的人

    while(queue.size() > 1){
        // 第一轮循环total次
        // 在丢手帕的过程中，队首的人跑到队尾去
        for ( var i = 0; i < total; i++ ) {
            queue.enqueue(queue.dequeue());
        }
        // 循环完毕，也就是结束了，那么手帕就在最后一个人手术，所以淘汰他
        who = queue.dequeue();
        console.log(`淘汰的是人是-----${who}`)
    }
    console.log(`获胜者是：${queue.dequeue()}`)
})(names, total);
