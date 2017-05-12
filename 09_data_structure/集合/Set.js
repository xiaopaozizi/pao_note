function Set() {
	this.dataStore = [];
	this.add = add;
	this.remove = remove;
	this.size = size;
	this.contains = contains;
	this.union = union;
	this.intersect = intersect;
	this.subset = subset;
	this.difference = difference;
	this.show = show;
}
// 添加成员
function add (data) {
	if (this.dataStore.indexOf(data) == -1) {
		this.dataStore.push(data);
		return true;
	} else {
		return false;
	}
}
// 删除成员
function remove(data) {
	var pos = this.dataStore.indexOf(data);
	if (pos > -1) {
		this.dataStore.splice(pos, 1);
		return true;
	} else {
		return false;
	}
}
// 显示集合
function show () {
	return this.dataStore;
}
// 返回集合的个数
function size () {
	return this.dataStore.length;
}
// 判断成员是否属于集合
function contains (data) {
	if (this.dataStore.indexOf(data) > -1) {
		return true;
	} else {
		return false;
	}
}
// 并集
function union (set) {
	var temSet = new Set();
	for ( var i = 0; i < this.dataStore.length; i++ ) {
		temSet.add(this.dataStore[i]);
	}
	for ( var j = 0; j < set.dataStore.length; j++ ) {
		if (!temSet.contains(set.dataStore[j])) {
			temSet.add(set.dataStore[j]);
		}
	}
	return temSet;
}
// 交集
function intersect(set) {
	var temSet = new Set();
	for ( var i = 0; i < this.dataStore.length; i++ ) {
		if (set.contains(this.dataStore[i])) {
			temSet.add(this.dataStore[i]);
		}
	}
	return temSet;
}
// 子集 A.subset(B) A是B的子集
function subset (set) {
	if (this.size() > set.size()) {
		return false;
	} else {
		for (var i = 0; i < this.dataStore.length; i++ ) {
			if (!set.contains(this.dataStore[i])) {
				return false;
			}
		}
		return true;
	}
}
// 交集
function difference (set) {
	var temSet = new Set();
	for ( var i = 0; i < this.dataStore.length; i++ ) {
		if (!set.contains(this.dataStore[i])) {
			temSet.add(this.dataStore[i]);
		}
	}
	return temSet;
}