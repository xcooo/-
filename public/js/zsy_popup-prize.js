$(function () {
	// 获取元素
	var prize_btn = document.querySelector("#prize_btn");
	var prize = document.querySelector(".htmleaf-container");
	var bg = document.querySelector("#bg_chou");
	var back_down = document.querySelector("#back_down");
	// 添加事件
	// 点击显示抽奖
	prize_btn.addEventListener("click", function () {
		back_down.style.display = "block";
		prize.style.display = "block";
		bg.style.display = "block"
	})
	// 点击退下关闭抽奖
	back_down.addEventListener("click", function () {
		back_down.style.display = "none";
		prize.style.display = "none";
		bg.style.display = "none"
	})
	// 隔行变色
	$('.shop_list .shop_list_item:odd').css('backgroundColor', 'rgba(255,255,255,0.8)')
	$('.shop_list .shop_list_item:even').css('backgroundColor', 'rgba(255,255,255,0.8)')
	var backgroundColor = null;
	$('.shop_list .shop_list_item').hover(function () {
		// 鼠标进入的时候, 把颜色记录下来
		backgroundColor = $(this).css('backgroundColor')
		$(this).css('backgroundColor', '#ccc');
	}, function () {
		// 鼠标离开的时候, 变回原来的颜色
		$(this).css('backgroundColor', backgroundColor);
	})
})
