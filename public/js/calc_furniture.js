var canvas = document.querySelector("#canvas")

init();

function init() {
	canvas.width = 202;
	canvas.height = 52;
	var ctx = canvas.getContext("2d");
	productResult();
	drawCover(ctx);
	clear(ctx);
}

// 让房屋价格随机		往span里面填充价格
function productResult() {
	// 获取元素
	var span = document.querySelector("#span");
	var arr = ['5元', '10元', '50优惠券'];
	// var arr=[''];
	var text = arr[randomInt(0, arr.length - 1)];
	span.innerHTML = text;
}

// 产生随机房价的函数
function randomInt(from, to) {
	return parseInt(Math.random() * (to - from + 1) + from);
}

// 利用canvas绘制灰色覆盖层
function drawCover(ctx) {
	ctx.save();
	// ctx.fillStyle = "rgb(100,100,100)";RGB(252,103,60)RGB(253,155,15)
	ctx.fillStyle = "rgb(253,155,15)";
	// 宽高
	ctx.fillRect(0, 0, 202, 52);
	ctx.restore();
}

// 按下鼠标刮去图层显示房价
function clear(ctx) {
	// 按下鼠标清楚涂层
	canvas.onmousedown = function function_name(e) {
		// console.log(e.offsetX);
		var downX = e.offsetX;
		var downY = e.offsetY;
		// 
		ctx.beginPath();
		// 
		ctx.globalCompositeOperation = "destination-out";
		ctx.lineWidth = 10;
		ctx.moveTo(downX, downY);

		canvas.onmousemove = function (e) {
			var x = e.offsetX;
			var y = e.offsetY;
			ctx.lineTo(x, y);
			// 
			ctx.stroke();
		}

	}

	// 松开鼠标
	canvas.onmouseup = function () {
		setTimeout(function () {
			canvas.onmousemove = null;
		}, 2000);

	}
}