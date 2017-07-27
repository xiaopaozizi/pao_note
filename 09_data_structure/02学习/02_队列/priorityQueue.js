/**
 * Created by 小炮子子 on 2017/7/27.
 */



class Node{
    constructor(item, priority){
        this.item = item;
        this.priority = priority;
    }
}
class PriorityQueue {
    constructor(){
        this.items = [];
    }

    // 入队---队尾进
    enqueue(item, priority){
        // 创建node
        let node = new Node(item, priority);
        // 判断队列是否为空
        // 为空，添加到队首
        if(this.isEmpty()){
            this.items.push(node);
        } else {
            // 不空，遍历，根据priority来添加
            let added = false;
            for ( let i = 0; i < this.items.length; i++ ) {
                if( priority < this.items[i].priority ){
                    this.items.splice(i, 0, node);
                    added = true;
                    break;
                }
            }
            // 如果添加，就是在
            if(!added){
                this.items.push(node);
            }
        }
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
        return this.items;
    }
}


console.log('#########################优先队列#############################')


let priorityQueue = new PriorityQueue();
priorityQueue.enqueue('剑军', 2);
priorityQueue.enqueue('老牛', 2);
priorityQueue.enqueue('大飞哥', 1);
priorityQueue.enqueue('何飞', 1);
priorityQueue.dequeue();
priorityQueue.dequeue();
console.log(priorityQueue.print())





