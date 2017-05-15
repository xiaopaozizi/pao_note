function Game () {
	this.data = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	// 分数
	this.score = 0;
	// 屏幕坐标
	this.startX = 0;
	this.startY = 0;
	this.endX = 0;
	this.endY = 0;
	this.slide = false;
	this.init();
}
// 初始化
Game.prototype.init = function () {
	// 清除数据
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (this.data[i][j] != 0) {
				this.data[i][j] = 0;			
			}
		}
	}
	// 生成两个随机数
	this.getOneRandomNum();
	this.getOneRandomNum();
	// 将两个随机数随机显示在面板中
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			// 初次输出坐标和值
			// console.log('(' + i + ", " + j + ')' + this.data[i][j]);
			if (this.data[i][j] != 0) {
				// 计算这两个随机数的位置是第一个div,一共16个
				var pos = i * 4 + j;
				$(".body div").eq(pos).addClass('num' + this.data[i][j]).html(this.data[i][j]);
			}
		}
	}
	// 触屏
	this.touchOrMove();
}
// 生成一个随机数
Game.prototype.getOneRandomNum = function () {
	var randNum = Math.ceil(Math.random() * 4) !== 4 ? 2 : 4;
	// 将数字放在相应的空格子中
	var x = Math.floor(Math.random() * 4);
	var y = Math.floor(Math.random() * 4);
	// console.log(x + ', ' + y);
	// 如果随机位置中的值为 0，那么就把随机数给他
	// 否则，重新调用自身函数
	if (this.data[x][y] == 0) {
		this.data[x][y] = randNum;
		this.repaint();
	} else {
		this.getOneRandomNum();
	}
}
// 重绘游戏面板
Game.prototype.repaint = function () {
	// console.log('li');
	var max = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			// 计算这两个随机数的位置是第一个div,一共16个
			var pos = i * 4 + j;
			// 初次输出坐标和值
			// console.log('(' + i + ", " + j + ')' + this.data[i][j]);
			// 先清空背景颜色和文字
			$(".body div").eq(pos).removeClass();
			if (this.data[i][j] != 0) {
				if (this.data[i][j] > max) {
					max = this.data[i][j];
				}
				$(".body div").eq(pos).addClass('num' + this.data[i][j]).html(this.data[i][j]);
				// 更新分数
				$('#box .score mark').html(max);
			} else {
				$('.body div').eq(pos).html('');
			}
		}
	}
	if ( this.isGameOver () ) {
		alert('Game Over');
		return;
	}
}
// 游戏结束
Game.prototype.isGameOver = function () {
	// 判断游戏结束条件
	// 1. 没有空格子
	// 2. 格子之间不等
	if ( this.isFull() ) {
		// console.log('满了');
		// 格子之间不等
		// 找到每个格子
		for ( var i = 0; i < 4; i++ ) {
			for ( var j = 0; j < 4; j++ ) {
				// console.log(i + ', ' + j)
				if (!this.noEqual(i, j)) {
					// console.log('有重复值');
					return false;
					// console.log('333');		
				}
			}
		}
		return true;
	} else {
		return false;
	}
}
// 判断格子都有值
Game.prototype.isFull = function () {
	var div = $('#box .body div');
	for ( var i = 0; i < div.length; i++ ) {
		if (div.eq(i).html() == '') {
			return false;
		}
	}
	return true;
}
// 相邻不相等
Game.prototype.noEqual = function (rows, cols) {
	// 将和法的数据加入到数组中
	var arr = [];
	var top = rows - 1;
	var bottom = rows + 1;
	var left = cols - 1;
	var right = cols + 1;


	// 把周围的格子安装约定装入数组中
	if (top >= 0) arr.push(this.data[top][cols]);
	if (bottom <= 3) arr.push(this.data[bottom][cols]);
	if (left >= 0) arr.push(this.data[rows][left]);
	if (right <= 3)	arr.push(this.data[rows][right]);
	// console.log('(' + rows + ', ' + cols + ') ' + data[rows][cols] + ', ' + arr.length);
	// 将数组进行 for in 循环，判读当前值是否与它的周围值（上下左右)其中之一相等
	for ( var k = 0; k < arr.length; k++ ) {
		if (this.data[rows][cols] == arr[k]) {
			// console.log('false');
			return false;
		}
	}
	// console.log('true')
	return true;
}
// 触屏或者移动操作
Game.prototype.touchOrMove = function () {
	var _this = this;
	// 检测代理商
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	var isTouch = bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM;
	// 如果 isTouch 有值，移动端；否则，PC 设置
	if (isTouch) {
		// console.log('移动');
		var deviceWidth = document.documentElement.clientWidth,  
	    scale = deviceWidth/520;  
	    document.body.style.zoom = scale;
		// console.log('移动');
		try {
			document.getElementById("body").addEventListener("touchstart", function (e) {
                e.preventDefault();
                this.startX = e.touches[0].pageX;
                this.startY = e.touches[0].pageY;
            });
            document.getElementById("body").addEventListener("touchmove", function (e) {
                e.preventDefault();
				this.endX = e.touches[0].pageX;
				this.endY = e.touches[0].pageY;
            });
            document.getElementById("body").addEventListener("touchend", function (e) {
                e.preventDefault();
				var x = this.endX - this.startX;
				var y = this.endY - this.startY;
				_this.moveDirection(x, y);
            });
		} catch (e) {
			console.log('移动端故障');
		}
		
	} else {
		// console.log('pc');
		$('#box').on('mousedown', function (e) {
			e.preventDefault();
			this.startX = Number(e.pageX);
			this.startY = Number(e.pageY);
			this.endX = this.startX;
			this.endY = this.startY;
		});
		$('#box').on('mouseup', function (e) {
			e.preventDefault();
			this.endX = Number(e.pageX);
			this.endY = Number(e.pageY);
			var x = this.endX - this.startX;
			var y = this.endY - this.startY;
			_this.moveDirection(x, y);
		})
	}
}
// 判断移动的方向，调用相应的移动函数
Game.prototype.moveDirection = function (x, y) {
	if ( x == 0 && y == 0 ) {
		return;
	}
	if ( Math.abs(x) > Math.abs(y) ) {		// 左右滑动
		if ( x > 0 ) {
			this.toRight();
		} else {
			this.toLeft();
		}
	} else {								// 上下滑动
		if ( y > 0 ) {
			this.toDown();
		} else {
			this.toUp();
		}
	}
}
// 移动
Game.prototype.move = function (event) {
	switch (event.keyCode) {
		case 37 :
			this.toLeft();
			break;
		case 38 :
			this.toUp();
			break;
		case 39 :
			this.toRight();
			break;
		case 40 :
			this.toDown();
			break;
	}
}
// 上移
Game.prototype.toUp = function () {
	// 第一种形式：下一个元素无值，当前元素有值
	for ( var j = 0; j < 4; j++ ) {
		for( var m = 0; m < 3; m++ ) {
			for ( var i = 0; i < 3; i++ ) {
				if (this.data[i][j] === 0 && this.data[i + 1][j] !== 0) {
					this.data[i][j] = this.data[i + 1][j];
					this.data[i + 1][j] = 0;
					this.slide = true;
				}
			}
		}
	}
	// 第二种形式： 当前元素和下一个元素有值并且相等
	for ( var j = 0; j < 4; j++ ) {	
		for ( var i = 0; i < 3; i++ ) {
			if ( this.data[i][j] !== 0 && this.data[i][j] === this.data[i + 1][j] ) {
				this.data[i][j] += this.data[i + 1][j];
				this.data[i + 1][j] = 0;
				this.slide = true;
			}
		}
	}
	// 第三种形式：当前元素为空时，下一个元素不为空，将下个元素赋值给当前值
	for ( var j = 0; j < 4; j++ ) {
		// 最最糟糕的情况 [0, 4, 0, 0]
		for ( var m = 0; m < 2; m++ ) {
			for ( var i = 0; i < 3; i++ ) {
				if ( this.data[i][j] === 0 && this.data[i + 1][j] !== 0 ) {
					this.data[i][j] = this.data[i + 1][j];
					this.data[i + 1][j] = 0;
				}
			}
		}
	}
	if (this.slide) {
		this.getOneRandomNum();
	}
	this.slide = false;
}
// 下移
Game.prototype.toDown = function () {
	// 第一种形式：下一个元素无值，当前元素有值
	for (var j = 0; j < 4; j++) {
		for (var m = 0; m < 3; m++) { // [2, 0, 0, 0] 	data[0~3][1]
			for (var i = 3; i > 0; i--) {
				if (this.data[i][j] == 0 && this.data[i - 1][j] != 0) {
					this.data[i][j] = this.data[i - 1][j];
					this.data[i - 1][j] = 0;
					this.slide = true;
				}
			}
		}
	}
	// 第二种形式： 当前元素和下一个元素有值并且相等
	for (var j = 0; j < 4; j++) {
		for (var i = 3; i > 0; i--) {
			if (this.data[i][j] != 0 && this.data[i][j] == this.data[i - 1][j]) {
				this.data[i][j] *= 2;
				this.data[i - 1][j] = 0;
				this.slide = true;
			}
		}
	}
	// 第三种形式：当前元素为空时，下一个元素不为空，将下个元素赋值给当前值
	for ( var j = 0; j < 4; j++ ) {
		for ( var m = 0; m < 2; m++ ) {
			for ( var i = 3; i > 0; i-- ) {
				if (this.data[i][j] === 0 && this.data[i - 1][j] !== 0 ) {
					this.data[i][j] = this.data[i - 1][j];
					this.data[i - 1][j] = 0;
				}
			}
		}
	}
	if (this.slide) {
		this.getOneRandomNum();
	}
}
// 左移 
Game.prototype.toLeft = function () {
	// 第一种形式：下一个元素无值，当前元素有值
	for ( var i = 0; i < 4; i++ ) {
		for( var m = 0; m < 3; m++ ) {
			for ( var j = 0; j < 3; j++ ) {
				if (this.data[i][j] === 0 && this.data[i][j] !== this.data[i][j + 1]) {
					this.data[i][j] = this.data[i][j + 1];
					this.data[i][j + 1] = 0;
					this.slide = true;
				}
			}
		}
	}
	// 第二种形式： 当前元素和下一个元素有值并且相等
	for ( var i = 0; i < 4; i++ ) {	
		for ( var j = 0; j < 3; j++ ) {
			if ( this.data[i][j] !== 0 && this.data[i][j] === this.data[i][j + 1] ) {
				this.data[i][j] += this.data[i][j + 1];
				this.data[i][j + 1] = 0;
				this.slide = true;
			}
		}
	}
	// 第三种形式：当前元素为空时，下一个元素不为空，将下个元素赋值给当前值
	for ( var i = 0; i < 4; i++ ) {
		for ( var m = 0; m < 2; m++ ) {
			for ( var j = 0; j < 3; j++ ) {
				if ( this.data[i][j] === 0 && this.data[i][j + 1] !== 0 ) {
					this.data[i][j] = this.data[i][j + 1];
					this.data[i][j + 1] = 0;
				}
			}
		}
	}
	if (this.slide) {
		this.getOneRandomNum();
	}
}
// 右移
Game.prototype.toRight = function () {
	var slide = false;
	// 第一种形式：下一个元素无值，当前元素有值
	for ( var i = 0; i < 4; i++ ) {
		for( var m = 0; m < 3; m++ ) {
			for ( var j = 3; j > 0; j-- ) {
				if ( this.data[i][j] == 0 && this.data[i][j - 1] != 0) {
					this.data[i][j] = this.data[i][j - 1];
					this.data[i][j - 1] = 0
					this.slide = true;
				}
			}
		}
	}
	// 第二种形式： 当前元素和下一个元素有值并且相等
	for ( var i = 0; i < 4; i++ ) {	
		for ( var j = 3; j > 0; j-- ) {
			if ( this.data[i][j] !== 0 && this.data[i][j] === this.data[i][j - 1] ) {
				this.data[i][j] += this.data[i][j - 1];
				this.data[i][j - 1] = 0;
				this.slide = true;
			}
		}
	}
	// 第三种形式：当前元素为空时，下一个元素不为空，将下个元素赋值给当前值
	for ( var i = 0; i < 4; i++ ) {
		for ( var m = 0; m < 2; m++ ) {
			for( var j = 3; j > 0; j-- ) {
				if ( this.data[i][j] === 0 && this.data[i][j - 1] !== 0 ) {
					this.data[i][j] = this.data[i][j - 1];
					this.data[i][j -1] = 0;
				} 
			}
		}
	}
	if (this.slide) {
		this.getOneRandomNum();
	}
}
