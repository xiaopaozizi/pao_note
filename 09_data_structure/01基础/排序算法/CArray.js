function CArray (numElements) {
	this.dataStore = [];
	this.pos = 0;
	this.numElements = numElements;
	this.setData = setData;
	this.toString = toString;
	this.insert = insert;
	this.clear = clear;
	this.swap = swap;
	this.bubbleSort = bubbleSort;
	this.selectionSort = selectionSort;
	this.insertSort = insertSort;
	this.gaps = [5, 3, 1];
	this.shellSort = shellSort;
	this.mergeSort = mergeSort;
	this.mergeArrays = mergeArrays;
	this.qSort = qSort;
}
// 在数组中添加数据
function insert (element) {
	this.dataStore[this.pos++] = element;
}
// 清空数组
function clear() {
	for ( var i = 0; i < this.dataStore.length; i++ ) {
		this.dataStore[i] = 0;
	}
}
// 设置数据
function setData() {
	for ( var i = 0; i < this.numElements; i++ ) {
		this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
	}
}
// 数组字符串化
function toString () {
	var str = '';
	for ( var i = 0; i < this.numElements; i++ ) {
		if (i > 0 && i % 10 === 0) {
			str += '\r\n';
		}
		str += this.dataStore[i] + ' ';
	}
	return str;
}
// 交互数组中数据
function swap(arr, index1, index2) {
	var temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
}
// 冒泡排序
function bubbleSort() {
	var length = this.dataStore.length;
	for ( var i = length; i >= 2; i-- ) {
		for ( var j = 0; j <= i - 1; j++ ) {
			if (this.dataStore[j] > this.dataStore[j + 1]) {
				this.swap(this.dataStore, j, j + 1);
			}
		}
	}
}
// 选择排序
function selectionSort() {
	var min, temp;
	// 遍历0 —— this.dataStore.length - 1 的数据
	for ( var outer = 0; outer < this.dataStore.length - 1; outer++ ) {
		// 将 第一个数据 赋值给 min
		min = outer;
		// 遍历 1 —— this.dataStore.length 的数据
		for ( var inner = outer + 1; inner < this.dataStore.length; inner++ ) {
			// 将 1 —— this.dataStore.length 的数据中小于 min 的数据 赋值给 min
			if (this.dataStore[inner] < this.dataStore[min]) {
				min = inner;
			}
		}
		// 交互 min 和 outer 数据
		this.swap(this.dataStore, outer, min);
	}
}
// 插入排序
function insertSort() {
	for ( var i = 1; i < this.dataStore.length; i++ ) {
		var tempData = this.dataStore[i];
		var j = i;this.dataStore
		while (j > 0 && (this.dataStore[j - 1] >= tempData)) {
			this.dataStore[j] = this.dataStore[j - 1];
			j--; 
		}
		this.dataStore[j] = tempData;
	}
}
// 希尔排序
function  shellSort() {
	// 遍历间距序列
	for ( var g = 0; g < this.gaps.length; g++ ) {
		// 按照间距序列遍历要排序的数组
		for ( var i = this.gaps[g]; i < this.dataStore.length; i++ ) {
			// 保存单例值
			var temp = this.dataStore[i];
			for ( var j = i; j >= this.gaps[g] && this.dataStore[j - this.gaps[g]] > temp; j -= this.gaps[g]) {
				this.dataStore[j] = this.dataStore[j - this.gaps[g]];
			}
			this.dataStore[j] = temp; 
		}
	}
}
// 归并排序
function mergeSort() {
	if (this.dataStore.length < 2) {
		return;
	} 
	var step = 1;
	var left, right;
	while (step < this.dataStore.length) {
		left = 0;
		right = step;
		while (right + step <= this.dataStore.length) {
			mergeArrays(this.dataStore, left, left + step, right, right + step);
			left = right + step;
			right = left + step;
		} 
		if (right < this.dataStore.length) {
			mergeArrays(this.dataStore, left, left + step, right, this.dataStore.length);
		} 
		step *= 2;
	}
}
function mergeArrays(arr,startLeft, stopLeft, startRight, stopRight) {
	var rightArr = new Array(stopRight - startRight + 1);
	var leftArr = new Array(stopLeft - startLeft + 1);
	k = startRight;
	for (var i = 0; i < (rightArr.length-1); ++i) {
		rightArr[i] = arr[k];
		++k;
	} 
	k = startLeft;
	for (var i = 0; i < (leftArr.length-1); ++i) {
		leftArr[i] = arr[k];
		++k;
	} 
	rightArr[rightArr.length -1 ] = Infinity; // 哨兵值
	leftArr[leftArr.length -1 ] = Infinity; // 哨兵值
	var m = 0;
	var n = 0;
	for (var k = startLeft; k < stopRight; ++k) {
		if (leftArr[m] <= rightArr[n]) {
			arr[k] = leftArr[m];
			m++;
		} else {
			arr[k] = rightArr[n];
			n++;
		}
	} 
}
// 快速排序
function qSort(arr) {
	if (arr.length === 0)	return [];
	var left = [];
	var right = [];
	var pivot = arr[0];
	for ( var i = 1; i < arr.length; i++ ) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return qSort(left).concat(pivot, qSort(right));
}
