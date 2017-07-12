function Node (data, left, right) {
	this.data = data;
	this.left = left;
	this.right = right;
	this.show = show;}
function show () {
	return this.data;
}
function BST() {
	this.root = null;
	this.insert = insert;
	this.inOrder = inOrder;
	this.preOrder = preOrder;
	this.postOrder = postOrder;
	this.getMin = getMin;
	this.getMax = getMax;
	this.find = find;
	this.remove = remove;
	this.removeNode = removeNode;
	this.getSmallRight = getSmallRight;
}
function insert (data) {
	var n = new Node(data, null, null);
	if (this.root == null) {
		this.root = n;
	} else {
		var current = this.root;
		var parent = null;
		while(true) {
			parent = current;
			if (data < current.data) {
				current = current.left;
				if (current == null) {
					parent.left = n;
					break;
				}
			} else {
				current = current.right;
				if (current == null) {
					parent.right = n;
					break;
				}
			}
		}
	}
}
// 中序 升序访问节点
function inOrder(node) {
	if (node != null) {
		inOrder(node.left);
		console.log(node.data);
		inOrder(node.right);
	}
}
// 先序，根节点 -> 左节点 -> 右节点
function preOrder (node) {
	if (node != null) {
		console.log(node.data);
		preOrder(node.left);
		preOrder(node.right);
	}
}
// 后序，左节点 -> 右节点 -> 根节点
function postOrder (node) {
	if (node != null) {
		postOrder(node.left);
		postOrder(node.right);
		console.log(node.data);
	}
}
// 获取最小值
function getMin() {
	var current = this.root;
	while(current.left != null) {
		current = current.left;
	}
	return current.data;
}
// 获取最大值
function getMax() {
	var current = this.root;
	while(current.right != null) {
		current = current.right;
	}
	return current.data;
}
// 查找给定值
function find(data) {
	var current = this.root;
	while(current != null) {
		if (current.data == data) {
			return current;
		} else if (current.data < data) {
			current = current.right;
		} else {
			current = current.left;
		}
	}
	return null;
}
// 删除指定值
function remove(data) {
	this.root = removeNode(this.root, data);
}
function removeNode(node, data) {
	if (node == null) return null;
	if (data == node.data) {
		// 只有根节点，没有左右节点
		if (node.left == null && node.right == null) {
			return null;
		}
		// 只有根节点,右节点
		if (node.left == null) {
			return node.right;
		}
		// 只有根节点,左节点
		if (node.right == null) {
			return node.left;
		}
		// 两个节点
		var temNode = getSmallRight(node.right);
		node.data = temNode.data;
		node.right = removeNode(node.right, temNode.data);
		return node;
	} else if (data < node.data) {
		node.left = removeNode(node.left, data);
		return node;
	} else {
		node.right = removeNode(node.right, data);
		return node;
	}
}
// 获取节点所有右子节点中的最小值
function getSmallRight(node) {
	while(node.left != null) {
		node = node.left;
	}
	return node;
}