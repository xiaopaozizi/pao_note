/**
 * Created by 小炮子子 on 2017/7/26.
 */

class Stack {

    constructor(){
        this.items = [];
    }

    // 入栈
    push(item){
        this.items.push(item);
    }

    // 出栈
    pop(){
        return this.items.pop();
    }

    // 返回栈顶元素，并不是删除
    peek(){
        return this.items[this.items.length - 1];
    }

    // 栈是否为空
    isEmpty(){
        return this.items.length === 0;
    }

    // 清空栈
    clear(){
        this.items = [];
    }

    // 栈长度
    size(){
        return this.items.length;
    }

    // 打印
    print(){
        console.log(this.items.toString());
    }
}
console.log('#####################案例使用#################################')

// 案例使用
let stack = new Stack();
stack.push('老牛');
stack.push('剑军');
stack.push('大飞哥');
console.log(stack.size());          // 3
console.log(stack.print());         // 老牛,剑军,大飞哥
console.log(stack.pop());        // 大飞哥
console.log(stack.peek());        // 剑军
console.log(stack.isEmpty());   // false
stack.clear();
console.log(stack.isEmpty());   // true

console.log('#####################十进制到二进制的转换#########################################')

// 十进制到二进制的转换
function tenTo2(num){
    let stack = new Stack();
    while(num > 0){
        stack.push(num % 2);
        num = Math.floor(num / 2);
    }
    var str = '';
    while(!stack.isEmpty()){
        str += stack.pop();
    }
    return str;
}
console.log(tenTo2(4));





