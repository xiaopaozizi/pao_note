function Queue() {
	this.dataStrore = [];				// 保存队列中的数据
	this.enqueue = enqueue;				// 入队
	this.dequeue = dequeue;				// 出队
	this.dequeue_priority = dequeue_priority;	// 优先队列，出队
	this.front = front;					// 读取队首元素，并非删除
	this.back = back;					// 读取队尾元素，并非删除
	this.toString = toString;			// 队中数据字符串化
	this.toString_priority = toString_priority;		// 优先队列字符串化
	this.length = length;				// 返回队的长度
	this.clear = clear;					// 清空队
	this.empty = empty;					// 判断队列是否为空
}
// 入队，向队尾添加一个元素
function enqueue (element) {
	this.dataStrore.push(element);
}
// 出队，删除队首的元素
function dequeue () {
	return this.dataStrore.shift();
}
// 优先队列
function dequeue_priority () {
	var priority = this.dataStrore[0].code;
	for ( var i = 0; i < this.dataStrore.length; i++ ) {
		if (this.dataStrore[i].code < priority) {
			priority = i;
		}
	}
	return this.dataStrore.splice(priority, 1);
}
// 读取队首元素，并非删除
function front () {
	return this.dataStrore[0];
}
// 读取队尾元素，并非删除
function back() {
	return this.dataStrore[this.dataStrore.length - 1];
}
// 队中数据字符串化
function toString () {
	var str = '';
	for ( var i = 0; i < this.dataStrore.length; i++ ) {
		str += this.dataStrore[i];
	}
	return str;
}
// 优先队列字符串化
function toString_priority () {
	var str = '';
	for ( var i = 0; i < this.dataStrore.length; i++ ) {
		str += this.dataStrore[i].name + ' code: ' 
		+ this.dataStrore[i].code + '\r\n';
	}
	return str;
}
// 返回队的长度
function length () {
	return this.dataStrore.length;
}
// 清空队 
function clear () {
	delete this.dataStrore;
	this.dataStrore = [];
}
// 判断队列是否为空
function empty () {
	if (this.length() == 0) {
		return true;
	} else {
		return false;
	}
}
