function Stack() {
	this.dataStrore = [];				// 保存栈中的数据
	this.top = 0;						// 记录栈顶的位置
	this.push = push;					// 入栈
	this.pop = pop;						// 出栈
	this.peek = peek;					// 预览栈顶元素，并非删除	
	this.clear = clear;					// 清空栈
	this.length = length;				// 返回栈的长度
	this.empty = empty;					// 返回栈是否为空/是否有元素
}
// push： 添加元素到栈顶
function push(element) {
	this.dataStrore[this.top++] = element;
}
// pop： 将栈顶上的元素弹出删除
function pop () {
	delete this.dataStrore[--this.top];
}
// peek：预览栈顶元素，并非删除
function peek () {
	return this.dataStrore[this.top - 1];
}
// clear：清空栈
function clear() {
	delete this.dataStrore;
	this.dataStrore = [];
	this.top = 0;
}
// length: 返回栈的长度
function length() {
	return this.top;
}
// empty：返回栈是否为空/是否有元素
function empty() {
	if (this.top == 0) {
		return true;
	} else {
		return false;
	}
}