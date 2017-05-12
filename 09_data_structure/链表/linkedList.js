function Node (element) {
	this.element = element;
	this.next = null;
}
function LinkedList () {
	this.head = new Node('head');					// 头节点
	this.find = find;								// 查找节点
	this.findPrevious = findPrevious;				// 查找前节点
	this.insert = insert;							// 添加节点
	this.remove = remove;							// 删除节点
	this.display = display;							// 显示节点
}
// 查找节点
function find (item) {
	var currNode = this.head;
	while(currNode.element != item) {
		currNode = currNode.next;
	}
	return currNode;
}
// 查找前节点
function findPrevious(item) {
	var currNode = this.head;
	while(currNode.next != null && currNode.next.element != item) {
		currNode = currNode.next;
	}
	return currNode;
}
// 添加节点, 在 item 所在节点之后添加 newElement节点
function insert(newElement, item) {
	var newNode = new Node(newElement);
	var current = this.find(item);
	// 1 -> 2 -> 4   要在 2 后添加一个 3
	// 首先，将 2.next 赋值给 3： 3.next = 2.next = 4;
	// 然后，将 3 赋值给 2.next：	2.next = 3;
	// 最后 1 -> 2 -> 3 -> 4
	newNode.next = current.next;
	current.next= newNode;
}
// 删除节点
function remove(item) {
	var prevNode = this.findPrevious(item);
	if (prevNode.next != null) {
		prevNode.next = prevNode.next.next;
	}
}
// 显示节点
function display() {
	var currNode = this.head;
	var str = '';
	while(currNode.next != null) {
		currNode = currNode.next;
		str += currNode.element + ' ';
	}
	return str;
}