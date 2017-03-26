/**
 * Created by yang on 2017/3/3.
 */

/*
* 通过class获取元素
* param :
*   oParent 父元素
*   sClass 类名
* return  Array
* */
function getByClass ( oParent, sClass ) {

    var res = [];
    var aEle = oParent.getElementsByTagName('*');

    for ( var i = 0; i < aEle.length; i++ ) {
        if ( aEle[i].className.indexOf( sClass ) > -1 ) {
            res.push( aEle[i] );
        }
    }
    return res;

}
/*
* 将伪数组转换为数组
* param :
*   data 伪数组
* return Array
* */
function toArray (data) {

    var res = [];

    for ( var i = 0; i < data.length; i++ ) {
        res.push( data[i] );
    }
    return res;

}
/*
* 事件绑定
* param :
*   obj 绑定对象
*   eventName 事件名称
*   fn 事件处理函数
* */
function bindEvent( obj, eventName, fn ) {

    if ( obj.addEventListener ) {
        obj.addEventListener( eventName, function (ev) {
			if(fn() == false){
				ev.cancelBubble = true;
				ev.preventDefault();
			}   
		}, false );
    } else if ( obj.attachEvent ) {
        obj.attachEvent( 'on' + eventName, function (){
			if ( fn() == false ) {
				window.event.cancelBubble = true;
				return false;
			}											 
		});
    }

}
/*
* 获取计算后样式
* param :
*   obj 元素
*   attr 元素的属性
* */
function getStyle(obj, attr) {

    if ( obj.currentStyle ) {   // ie
        return obj.currentStyle[attr];
    } else {    // !ie
        return getComputedStyle(obj, false)[attr];
    }

}

// 运动函数
// 参数：obj 运动的元素
// 参数：attr 运动元素的属性
// 参数：step 运动步长，决定运动方向
// 参数：target 运动的目标值
// 参数：endFn 回调函数 可选
function move (obj, attr, step, target, endFn) {
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
/*
 * 动画效果
 * */
function animate (obj, json, fn) {

	var iCur = 0;
	var iSpeed = 10;

	clearInterval( obj.timer );
	obj.timer = setInterval(function () {

		var isFlag = true;

		for ( var attr in json ) {

			var iTarget = json[attr];

			iCur = attr === 'opacity'
				? Math.round(getStyle( obj, 'opacity' ) * 100)
				: parseInt( getStyle( obj, attr ) );
			iSpeed = ( iTarget - iCur ) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if ( iCur !== iTarget ) {
				isFlag = false;
				if ( attr === 'opacity' ) {
					obj.style.opacity = ( iCur + iSpeed ) / 100;
					obj.style.filter = 'alpha(opacity=' + ( iCur + iSpeed ) + ')';
				} else {
					obj.style[attr] = ( iCur + iSpeed ) + 'px';
				}
			}

		}
		if ( isFlag ) {
			clearInterval( obj.timer );
			fn && fn.call(obj);
		}

	}, 30);

}



// 物体抖动
// 参数：obj 抖动的对象
// 参数：attr 抖动的属性,只有left和top两种情况
//       left左右抖动 || top 上下抖动
// 参数：initValue 属性初始值 eg：100
// 参数：endFn 回调函数 可选
function shake (obj, attr, initValue, endFn) {
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
function randomNumber (start, end) {
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
/*
 method post/get
 url 地址
 data 提交的数据
 success 成功的回调函数
 */
function ajax(method, url, data, success) {
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	if (method == 'get' && data) {
		url += '?' + data;
	}

	xhr.open(method,url,true);
	if (method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}

	xhr.onreadystatechange = function() {

		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				success && success(xhr.responseText);
			} else {
				alert('出错了,Err：' + xhr.status);
			}
		}

	}
}
// 设置cookie
function setCookie (key, value, t) {
	var oDate = new Date();
	oDate.setDate( oDate.getDate() + t );
	document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}
// 获取cookie
function getCookie (key) {
	var arr1 = document.cookie.split('; ');
	for (var i=0; i<arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if ( arr2[0] == key ) {
			return decodeURI(arr2[1]);
		}
	}
}
// 删除cookie
function removeCookie (key) {
	setCookie(key, '', -1);
}
/*
* 迷你JQuery
* 常用的JQuery功能
* */
function YCQ( yArg ) {

    this.elements = [];

    // 判断类型
    switch ( typeof yArg ) {
        case 'function':
            // window.onload = function () {}
            bindEvent( window, 'load', yArg );
            break;
        case 'string':
            // 第一个字符
            var firstChar = yArg.charAt(0);

            switch ( firstChar ) {
                case '#':   // id
                    this.elements.push( document.getElementById( yArg.substring(1) ) );
                    break;
                case '.':   // class
                    this.elements = getByClass( document, yArg.substring(1) );
                    break;
                default:    // tag
                    this.elements = toArray( document.getElementsByTagName( yArg ) );
                    break;
            }
            break;
        case 'object':
            this.elements.push( yArg );
            break;
    }

}
function $( yArg ) {
    return new YCQ( yArg );
}
/*
* 绑定事件
* param :
*   events 事件名称
*   fn 事件处理函数
* */
YCQ.prototype.on = function (events, fn) {


    for ( var i = 0; i < this.elements.length; i++ ) {
        bindEvent(this.elements[i], events, fn);
    }
	
	return this;

}
/*
* 点击事件
* param :
*   fn 事件处理函数
* */
YCQ.prototype.click = function (fn) {

    this.on('click', fn);
	
	return this;

}
/*
 * 显示元素
 * */
YCQ.prototype.show = function () {

    for ( var i = 0; i < this.elements.length; i++ ) {
        this.elements[i].style.display = 'block';
    }
	return this;

}
/*
 * 隐藏元素
 * */
YCQ.prototype.hide = function () {

    for ( var i = 0; i < this.elements.length; i++ ) {
        this.elements[i].style.display = 'none';
    }
	return this;
}
/*
* 鼠标移入移出
* */
YCQ.prototype.hover = function (overFn, outFn) {

    this.on('mouseover', overFn);
    this.on('mouseout', outFn);
	return this;
}
/*
 * 设置和获取样式
 * */
YCQ.prototype.css = function (attr, value) {

    if ( arguments.length === 1 ) {
        return getStyle( this.elements[0], attr );
    } else if ( arguments.length === 2 ) {
        for ( var i = 0; i < this.elements.length; i++ ) {
            this.elements[i].style[attr] = value;
        }
    }
	return this;

}
/*
 * 设置和获取属性
 * */
YCQ.prototype.attr = function (attr, value) {

    if ( arguments.length === 1 ) {
        return this.elements[0].getAttribute(attr);
    } else if ( arguments.length === 2 ) {
        for ( var i = 0; i < this.elements.length; i++ ) {
            this.elements[i].setAttribute(attr, value);
        }
    }
	return this;
}
/*
* 获取innerHTML
* */
YCQ.prototype.html = function (content) {

	if ( content !== undefined ) {
		for ( var i = 0; i < this.elements.length; i++ ) {
			this.elements[i].innerHTML = content;
		}	
	} else {
		return this.elements[0].innerHTML;	
	}
	
}
/*
* 获取第N个元素
* */
YCQ.prototype.eq = function (index) {

    if (index >= this.elements.length || index < 0 ) return;
    return this.elements[index];

}
/*
 * 获取当前元素在父元素中的索引位置
 * */
YCQ.prototype.index = function () {

    var parentEle = this.elements[0].parentNode.children;
    for ( var i = 0; i < parentEle.length; i++ ) {
        if (this.elements[0] === parentEle[i]) return i;
    }

}
/*
 * 通过class和tag来获取元素
 * */
YCQ.prototype.find = function (str) {

    var arr = [];
    var firstChar = str.charAt(0);
    if ( firstChar === '.' ) {  // class
        for ( var i = 0; i < this.elements.length; i++ ) {
            if (this.elements[i].className.indexOf(str.substring(1)) > -1) {
                arr.push( this.elements[i] );
            }
        }
    } else {    // tag
        for ( var i = 0; i < this.elements.length; i++ ) {
            if ( this.elements[i].tagName.toLowerCase() === str.toLowerCase() ) {
                arr.push(this.elements[i]);
            }
        }
    }
    return arr;

}

// 对象扩展 
// 去除首尾空格
$.trim = function (str) {
	return str.replace( /^\s+|\s+$/g, '' );	
}
// 通过JSON对象扩展
$.extend = function (json) {
	for ( var attr in json ) {
		$[attr] = json[attr];
	}	
}
// 扩展原型方法
$.fn = {};
$.fn.extend = function (json) {
	for ( var attr in json ) {
		YCQ.prototype[attr] = json[attr];	
	}	
}