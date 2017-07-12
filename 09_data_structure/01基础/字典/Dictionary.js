function Dictionary() {
	this.dataStrore = [];
	this.add = add;
	this.remove = remove;
	this.find = find;
	this.showAll = showAll;
	this.count = count;
	this.clear = clear;
}
// 添加字典
function add (key, value) {
	this.dataStrore[key] = value;
}
// 通过 key 查找 value
function find (key) {
	return this.dataStrore[key];
}
// 通过 key 删除字典
function remove (key) {
	delete this.dataStrore[key];
}
// 遍历字典
function showAll() {
	var keys = Object.keys(this.dataStrore).sort();
	for (var key in keys) {
		console.log(keys[key] + ' => ' + this.dataStrore[keys[key]]);
	}
}
// 字典个数
function count () {
	var n = 0;
	// Object.Keys 方法返回一个数组，其中包含了一个 Dictionary 对象中的全部现有的主键。
	for (var key in Object.keys(this.dataStrore)) {
		n++;
	}
	return n;
}
// 清空字典
function clear () {
	for (var key in this.dataStrore) {
		delete this.dataStrore[key];
	}
}