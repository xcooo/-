$(function () {
	// 预加载
	setTimeout(function () {
		$('body').addClass('loaded');
		$('.load_bg').fadeOut()
		// $('#loader-wrapper .load_title').remove();
	}, 1200)
	// 被卷去的头部 scrollTop()
	// 页面滚动事件
	// 下滑显示小火箭
	var acquiesce_filter_Top = $(".acquiesce_filter").offset().top;
	$(window).scroll(function () {
		if ($(document).scrollTop() >= acquiesce_filter_Top) {
			$("#btn-top").fadeIn();
		} else {
			$("#btn-top").fadeOut();
		}
	})

	// 带有动画的点击返回顶部
	// 使用animate动画函数
	$("#btn-top").click(function () {
		// [重点]元素做动画	文档做动画无效
		$("body,html").stop().animate({
			scrollTop: 0
		});
	})

	// 全部分类显示隐藏功能
	// 必须要给显示的父级元素添加事件
	$('.dropdown').mouseenter(function () {
		$(this).children('.dd').show()
	})
	$('.dropdown').mouseleave(function () {
		$(this).children('.dd').hide()
	})
})
