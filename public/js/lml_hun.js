$(function () {
    // 预加载
    setTimeout(function () {
        $('body').addClass('loaded');
        $('.load_bg').fadeOut()
        // $('#loader-wrapper .load_title').remove();
    }, 1200)

    // 全部分类显示隐藏功能
    // 必须要给显示的父级元素添加事件
    $('.dropdown').mouseenter(function () {
        $(this).children('.dd').show()
    })
    $('.dropdown').mouseleave(function () {
        $(this).children('.dd').hide()
    })
    $(".tou .xinxi .ping2 a").click(function () {
        if ($(this).html() == '更多信息') {
            $(this).html('<p>营业时间：周五,周六 10:30-:23:30  修改</p>')
            $(".tou .xinxi p").stop().slideDown()
        } else {
            $(this).html("更多信息")
            $(".tou .xinxi p").stop().slideUp()
        }
    })

    $(".wrap-bottom li").on("click", function () {
        var index = $(this).index()
        console.log(index);
        $(this).addClass("Choice-a").siblings().removeClass("Choice-a")
        $(".wrap-top .fige img").eq(index).show().siblings().hide()

    })

    var x=$(window);
var e=$("#shape");

$("html,body").ready(function(){
	var scrollbar=x.scrollTop();
	var isClick=0;

	(scrollbar<=0)?($("#shape").hide()):($("#shape").show());

	$(window).scroll(function(){
		scrollbar=x.scrollTop();
		(scrollbar<=0)?($("#shape").hide()):($("#shape").show());			
	})

	$("#shape").hover(
		function(){
			$(".shapeColor").show();
		},

		function(){
			$(".shapeColor").hide();
		}
	)

	$(".shapeColor").click(
		function(){
			$(".shapeFly").show();
			$("html,body").animate({scrollTop: 0},"slow");
			$("#shape").delay("200").animate({marginTop:"-1000px"},"slow",function(){
				$("#shape").css("margin-top","-125px");
				$(".shapeFly").hide();
			});
			
	})
})
})
