$(function () {
	// 被卷去的头部 scrollTop()
	// 页面滚动事件
	// 下滑显示小火箭
	// var acquiesce_filter_Top = $(".acquiesce_filter").offset().top;
	// console.log(acquiesce_filter_Top);
	// $(window).scroll(function() {
	// 	console.log($(document).scrollTop());
	// 	if ($(document).scrollTop() >= acquiesce_filter_Top) {
	// 		$("#btn-top").fadeIn();
	// 	} else {
	// 		$("#btn-top").fadeOut();
	// 	}
	// })

	// 带有动画的点击返回顶部
	// 使用animate动画函数
	// $("#btn-top").click(function () {
	// 	// [重点]元素做动画	文档做动画无效
	// 	$("body,html").stop().animate({
	// 		scrollTop: 0
	// 	});
	// })
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

	    // 预加载
		setTimeout(function () {
			$('body').addClass('loaded');
			$('.load_bg').fadeOut()
			// $('#loader-wrapper .load_title').remove();
		}, 1200)
})
