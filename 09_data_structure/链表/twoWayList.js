function Node (element) {
	this.element = element;
	this.previous = null;
	this.next = null;
}
function TwoWayList() {
	this.head = new Node('head');
	this.find = find;
	this.findLast = findLast;
	this.insert = insert;
	this.remove = remove;
	this.display = display;
	this.dispReverse = dispReverse;
}
// 查找节点
function find (item) {
	var currNode = this.head;
	while(currNode.element != item) {
		currNode = currNode.next;
	}
	return currNode;
}
// 查找尾节点
function findLast() {
	var currNode = this.head;
	while(currNode.next != null) {
		currNode = currNode.next;
	}
	return currNode;
}
// 在指定节点后添加节点
function insert (newElement, item) {
	var currNode = this.find(item);
	var newNode = new Node(newElement);
	newNode.next = currNode.next;
	currNode.next = newNode;
	newNode.previous = currNode;
}
// 删除指定节点
function remove(item) {
	var currNode = this.find(item);
	if (currNode.next != null) {
		currNode.previous.next = currNode.next;
		currNode.next.previous = currNode.previous;
		currNode.next = null;
		currNode.previous = null;
	}
}
// 遍历链表
function display () {
	var currNode = this.head;
	var str = '';
	while(currNode.next != null) {
		currNode = currNode.next;
		str += currNode.element + ' ';
	}
	return str;
}
// 反向遍历链表
function dispReverse() {
	var currNode = this.findLast();
	var str = '';
	while (currNode.previous != null) {
		str += currNode.element + ' ';
		currNode = currNode.previous;
	}
	return str;
}