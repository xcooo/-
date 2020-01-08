$(function() {
	// 1. 全选 全不选功能模块
	// 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
	// 事件可以使用change
	$(".checkall").change(function() {
		// 检测拿到的状态
		// console.log($(this).prop("checked"));
		$(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
		if ($(this).prop("checked")) {
			// 让所有的商品添加 check-cart-item 类名
			$(".cart-item").addClass("check-cart-item");
		} else {
			// check-cart-item 移除
			$(".cart-item").removeClass("check-cart-item")
		}
	});
	// 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
	$(".j-checkbox").change(function() {

		// if(被选中的小的复选框的个数 === 3) {
		//     就要选中全选按钮
		// } else {
		//     不要选中全选按钮
		// }
		// console.log($(".j-checkbox:checked").length);
		// $(".j-checkbox").length 这个是所有的小复选框的个数
		if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
			// alert(1);
			$(".checkall").prop("checked", true);
		} else {
			$(".checkall").prop("checked", false);
		}
		// 如果j-checkbox为选中状态
		// 就让当前的商品添加 check-cart-item 类名
		// 否则check-cart-item 移除
		if ($(this).prop("checked")) {
			$(this).parents(".cart-item").addClass("check-cart-item");
		} else {
			$(this).parents(".cart-item").removeClass("check-cart-item");
		}
	});
	// 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
	$(".increment").click(function() {
		// 得到当前兄弟文本框的值
		var n = $(this).siblings(".itxt").val();
		// console.log(n);
		n++;
		$(this).siblings(".itxt").val(n);
		// 3.2 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
		// 当前商品的价格 p
		var p = $(this).parents(".p-num").siblings(".p-price").html();
		// console.log(p);
		p = p.substr(1);
		console.log(p);
		var price = p * n;
		// 小计模块
		// toFixed(2)	保留两位小数
		$(this).parents(".p-num").siblings(".p-sum").html("¥" + (price).toFixed(2));
		getSum();
	});
	// 4. 用户修改文本框的值 计算 小计模块
	$(".itxt").change(function() {
		// 先得到文本框的里面的值 乘以 当前商品的单价
		var n = $(this).val();
		// 当前商品的单价
		var p = $(this).parents(".p-num").siblings(".p-price").html();
		p = p.substr(1);
		console.log(p);
		$(this).parents(".p-num").siblings(".p-sum").html("¥" + (p * n).toFixed(2));
		getSum();
	})
	// 减号部分
	$(".decrement").click(function() {
		// 得到当前兄弟文本框的值
		var n = $(this).siblings(".itxt").val();
		// console.log(n);
		if (n == 1) {
			// false ????
			// 1.取消事件的默认行为 此处的事件a链接有默认跳转行为
			// 2.取消事件冒泡 禁止传递给父元素
			// 3.结束函数
			return false;
		}
		n--;
		$(this).siblings(".itxt").val(n);
		// 3.2 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
		// 当前商品的价格 p
		var p = $(this).parents(".p-num").siblings(".p-price").html();
		// console.log(p);
		p = p.substr(1);
		console.log(p);
		var price = p * n;
		// 小计模块
		// toFixed(2)	保留两位小数
		$(this).parents(".p-num").siblings(".p-sum").html("¥" + (price).toFixed(2));
		getSum();
	});
	// 5. 计算总计和总额模块
	function getSum() {
		// 计算总件数
		var count = 0;
		// 计算总价钱
		var money = 0;
		// 遍历数量文本框
		// i索引号
		// element 元素
		// 计算总件数
		$(".itxt").each(function(i, ele) {
			count += parseInt($(ele).val());
		})
		$(".amount-sum em").text(count);
		// 计算总价钱
		$(".p-sum").each(function(i, ele) {
			money += parseInt($(ele).text().substr(1));
		})
		$(".price-sum em").text("¥" + money);
	}
	// 6. 删除商品模块
	// (1) 商品后面的删除按钮
	// 删除的是当前的商品 
	// (2) 删除选中的商品
	// 删除的是小的复选框选中的商品
	// (3) 清空购物车 删除全部商品

	// (1) 商品后面的删除按钮
	$(".p-action a").click(function() {
		// 删除的是当前的商品  
		// 点击this 当前的删除键 删除当前的模块
		$(this).parents(".cart-item").remove();
		getSum();
	});
	// (2) 删除选中的商品
	// 删除的是小的复选框选中的商品
	$(".remove-batch").click(function() {
		// 获取类名要记得加点
		$(".j-checkbox:checked").parents(".cart-item").remove();
		getSum();
	});
	// (3) 清空购物车 删除全部商品
	$(".clear-all").click(function() {
		$(".cart-item").remove();
		getSum();
	})


	var x = $(window);
	var e = $("#shape");

	$("html,body").ready(function () {
		var scrollbar = x.scrollTop();
		var isClick = 0;

		(scrollbar <= 0) ? ($("#shape").hide()) : ($("#shape").show());

		$(window).scroll(function () {
			scrollbar = x.scrollTop();
			(scrollbar <= 0) ? ($("#shape").hide()) : ($("#shape").show());
		})

		$("#shape").hover(
			function () {
				$(".shapeColor").show();
			},

			function () {
				$(".shapeColor").hide();
			}
		)

		$(".shapeColor").click(
			function () {
				$(".shapeFly").show();
				$("html,body").animate({ scrollTop: 0 }, "slow");
				$("#shape").delay("200").animate({ marginTop: "-1000px" }, "slow", function () {
					$("#shape").css("margin-top", "-125px");
					$(".shapeFly").hide();
				});

			})
	})







})
