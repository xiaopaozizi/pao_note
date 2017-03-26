// yang.js
// 通过id获取元素
// 参数：id id值
function $(id) { return document.getElementById(id); }


// 获取元素的样式
// 参数：ele 元素
// 参数：attr 属性
function getStyle(ele, attr) {
	return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, 0)[attr];	
}

// 运动函数
// 参数：obj 运动的元素
// 参数：attr 运动元素的属性
// 参数：step 运动步长，决定运动方向
// 参数：target 运动的目标值
// 参数：endFn 回调函数 可选
function move(obj, attr, step, target, endFn) {
	// 以向左向右运动为例
	// 如果当前值<目标值，则向右运动，step为正
	// 如果当前值>目标值，则左运动，step为负
	// PS : 方向在一开始就设置，一经设置就不能更改
	step = parseInt(getStyle(obj, attr)) < target ? step : -step;
	// 关闭定时器
	clearInterval(obj.timer);
	// 设置定时器
	obj.timer = setInterval(function () {	
		// 运动物体当前的值
		var currVal = parseInt(getStyle(obj, attr));
		// 运动的下一个位置值
		var nextVal = currVal + step;
		// 当运动的下一个值超出目标值，则下一个值 = 目标值
		if (nextVal > target && step > 0 || nextVal < target && step < 0) {
			nextVal = target;	
		}
		// 开始运动
		obj.style[attr] = nextVal + 'px';
		// 当下一个值等于目标值，则关闭定时器
		if (nextVal === target) {
			clearInterval(obj.timer);	
			// 相当于 if (endFn) endFn(); 
			endFn && endFn();
		}
	}, 30);	
}

// 透明度
// 参数：obj 运动的元素
// 参数：step 运动步长，决定运动方向
// 参数：target 运动的目标值
// 参数：endFn 回调函数 可选
function opacity(obj, step, target, endFn) {
	// 在这里直接忽略ie678 opacity : 0~1
	var attr = 'opacity';
	step = parseInt(getStyle(obj, attr)) < target ? step : -step;
	// 关闭定时器
	clearInterval(obj.timer);
	// 设置定时器
	obj.timer = setInterval(function () {	
		// 运动物体当前的值
		var currVal = parseInt(getStyle(obj, attr));
		// 运动的下一个位置值
		var nextVal = currVal + step;
		// 当运动的下一个值超出目标值，则下一个值 = 目标值
		if (nextVal > target && step > 0 || nextVal < target && step < 0) {
			nextVal = target;	
		}
		// 开始运动
		obj.style[attr] = nextVal;
		// 当下一个值等于目标值，则关闭定时器
		if (nextVal === target) {
			clearInterval(obj.timer);	
			// 相当于 if (endFn) endFn(); 
			endFn && endFn();
		}
	}, 30);	
}



// 物体抖动
// 参数：obj 抖动的对象
// 参数：attr 抖动的属性,只有left和top两种情况
//       left左右抖动 || top 上下抖动
// 参数：initValue 属性初始值 eg：100
// 参数：endFn 回调函数 可选
function shake(obj, attr, initValue, endFn) {
	// 初始化值
	obj.style[attr] = initValue + 'px';
	// 创建一个数组 20 -20 18 -18 ... 2 -2 0
	var arr = [];
	for ( var i = 20; i > 0; i -= 2 ) {
		arr.push(i, -i);
	}
	arr.push(i);
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		obj.style[attr] = parseInt(getStyle(obj, attr)) + arr[i++] + 'px';
		if (i === arr.length) {
			clearInterval(obj.timer);
			flag = true;
			i = 0;
			endFn && endFn();
		}
	}, 30);
}

// 随机生成【start,end）的数字
function randomNumber(start, end) {
	return Math.floor(Math.random() * (end - start) + start);
}
