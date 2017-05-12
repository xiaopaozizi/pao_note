function HashTable() {
	this.table = new Array(137);
	this.buildChains = buildChains;
	this.simpleHash = simpleHash;
	this.showDistro = showDistro;
	this.put = put;
	this.get = get;
}
// 开链法
function buildChains () {
	for ( var i = 0; i < this.table.length; i++ ) {
		this.table[i] = [];
	}
}
// 计算散列位置
function simpleHash (data) {
	var total = 0;
	for ( var i = 0; i < data.length; i++ ) {
		total = total * 31 + data.charCodeAt(i);
	}
	total = total % this.table.length;
	if (total < 0) {
		total += this.table.length - 1;
	}
	console.log(total);
	return parseInt(total);
}
// 存放散列值
function put (key, data) {
	var pos = this.simpleHash(key);
	var index = 0;
	if (this.table[pos][index] == undefined) {
		this.table[pos][index] = key;
		this.table[pos][index + 1] = data;
	} else {
		index++;
		while(this.table[pos][index] != undefined){
			index++;
		}
		this.table[pos][index] = key;
		this.table[pos][index + 1] = data;
	}

}

// 获取散列值
function get(key) {
	var pos = this.simpleHash(key);
	var index = 0;
	if (this.table[pos][index] == key) {
		return this.table[pos][index + 1];
	} else {
		index += 2;
		while(this.table[pos][index] != key) {
			index += 2;
		}
		return this.table[pos][index + 1];
	}
	return undefined;
}
// 遍历散列值
function showDistro() {
	for ( var i = 0; i < this.table.length; i++ ) {
		if (this.table[i] != undefined) {
			if (this.table[i][0] != undefined) {
				console.log(i + ': ' + this.table[i]);
			}
		}
	}
}