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

// 拖拽效果
// obj 表示被拖拽的物体
function drag (obj) {
	/*
	1.拖拽的时候，如果有文字被选中，会产生问题
	原因：当鼠标按下的时候，如果页面中有文字被选中，那么会触发浏览器默认拖拽文字的效果
			解决：
				标准：阻止默认行为
				非标准ie：全局捕获
	拖拽图片会有问题，原因，解决的办法同上
	*/
	// 鼠标按下
	obj.onmousedown = function (ev) {
		
		var ev = ev || event;
		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;
		
		// 设置全局捕获
		if (obj.setCapture) obj.setCapture();
		
		// 鼠标在文档中移动
		document.onmousemove = function (ev) {
		
			var ev = ev || event;
			var L = ev.clientX - disX;
			var T = ev.clientY - disY;
			
			// 限制范围 + 吸附功能
			if ( L < 100 ) {
				L = 0;
			} else if ( L > document.documentElement.clientWidth - obj.offsetWidth ) {
				L = document.documentElement.clientWidth - obj.offsetWidth;	
			}
			if ( T < 0 ) {
				T = 0;
			} else if ( T > document.documentElement.clientHeight - obj.offsetHeight ) {
				T = document.documentElement.clientHeight - obj.offsetHeight;	
			}
			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
			
		}
		
		// 鼠标抬起
		document.onmouseup = function () {
			
			document.onmousemove = document.onmouseup = null;
			// 释放全局捕获
			if (obj.releaseCapture) obj.releaseCapture();
			
		}
		
		return false;
		
	}
	
}

