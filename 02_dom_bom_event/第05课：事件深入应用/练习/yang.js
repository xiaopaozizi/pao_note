// yang.js
// ͨ��id��ȡԪ��
// ������id idֵ
function $(id) { return document.getElementById(id); }


// ��ȡԪ�ص���ʽ
// ������ele Ԫ��
// ������attr ����
function getStyle(ele, attr) {
	return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, 0)[attr];	
}

// �˶�����
// ������obj �˶���Ԫ��
// ������attr �˶�Ԫ�ص�����
// ������step �˶������������˶�����
// ������target �˶���Ŀ��ֵ
// ������endFn �ص����� ��ѡ
function move(obj, attr, step, target, endFn) {
	// �����������˶�Ϊ��
	// �����ǰֵ<Ŀ��ֵ���������˶���stepΪ��
	// �����ǰֵ>Ŀ��ֵ�������˶���stepΪ��
	// PS : ������һ��ʼ�����ã�һ�����þͲ��ܸ���
	step = parseInt(getStyle(obj, attr)) < target ? step : -step;
	// �رն�ʱ��
	clearInterval(obj.timer);
	// ���ö�ʱ��
	obj.timer = setInterval(function () {	
		// �˶����嵱ǰ��ֵ
		var currVal = parseInt(getStyle(obj, attr));
		// �˶�����һ��λ��ֵ
		var nextVal = currVal + step;
		// ���˶�����һ��ֵ����Ŀ��ֵ������һ��ֵ = Ŀ��ֵ
		if (nextVal > target && step > 0 || nextVal < target && step < 0) {
			nextVal = target;	
		}
		// ��ʼ�˶�
		obj.style[attr] = nextVal + 'px';
		// ����һ��ֵ����Ŀ��ֵ����رն�ʱ��
		if (nextVal === target) {
			clearInterval(obj.timer);	
			// �൱�� if (endFn) endFn(); 
			endFn && endFn();
		}
	}, 30);	
}

// ͸����
// ������obj �˶���Ԫ��
// ������step �˶������������˶�����
// ������target �˶���Ŀ��ֵ
// ������endFn �ص����� ��ѡ
function opacity(obj, step, target, endFn) {
	// ������ֱ�Ӻ���ie678 opacity : 0~1
	var attr = 'opacity';
	step = parseInt(getStyle(obj, attr)) < target ? step : -step;
	// �رն�ʱ��
	clearInterval(obj.timer);
	// ���ö�ʱ��
	obj.timer = setInterval(function () {	
		// �˶����嵱ǰ��ֵ
		var currVal = parseInt(getStyle(obj, attr));
		// �˶�����һ��λ��ֵ
		var nextVal = currVal + step;
		// ���˶�����һ��ֵ����Ŀ��ֵ������һ��ֵ = Ŀ��ֵ
		if (nextVal > target && step > 0 || nextVal < target && step < 0) {
			nextVal = target;	
		}
		// ��ʼ�˶�
		obj.style[attr] = nextVal;
		// ����һ��ֵ����Ŀ��ֵ����رն�ʱ��
		if (nextVal === target) {
			clearInterval(obj.timer);	
			// �൱�� if (endFn) endFn(); 
			endFn && endFn();
		}
	}, 30);	
}



// ���嶶��
// ������obj �����Ķ���
// ������attr ����������,ֻ��left��top�������
//       left���Ҷ��� || top ���¶���
// ������initValue ���Գ�ʼֵ eg��100
// ������endFn �ص����� ��ѡ
function shake(obj, attr, initValue, endFn) {
	// ��ʼ��ֵ
	obj.style[attr] = initValue + 'px';
	// ����һ������ 20 -20 18 -18 ... 2 -2 0
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

// ������ɡ�start,end��������
function randomNumber(start, end) {
	return Math.floor(Math.random() * (end - start) + start);
}

// ��קЧ��
// obj ��ʾ����ק������
function drag (obj) {
	/*
	1.��ק��ʱ����������ֱ�ѡ�У����������
	ԭ�򣺵���갴�µ�ʱ�����ҳ���������ֱ�ѡ�У���ô�ᴥ�������Ĭ����ק���ֵ�Ч��
			�����
				��׼����ֹĬ����Ϊ
				�Ǳ�׼ie��ȫ�ֲ���
	��קͼƬ�������⣬ԭ�򣬽���İ취ͬ��
	*/
	// ��갴��
	obj.onmousedown = function (ev) {
		
		var ev = ev || event;
		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;
		
		// ����ȫ�ֲ���
		if (obj.setCapture) obj.setCapture();
		
		// ������ĵ����ƶ�
		document.onmousemove = function (ev) {
		
			var ev = ev || event;
			var L = ev.clientX - disX;
			var T = ev.clientY - disY;
			
			// ���Ʒ�Χ + ��������
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
		
		// ���̧��
		document.onmouseup = function () {
			
			document.onmousemove = document.onmouseup = null;
			// �ͷ�ȫ�ֲ���
			if (obj.releaseCapture) obj.releaseCapture();
			
		}
		
		return false;
		
	}
	
}

