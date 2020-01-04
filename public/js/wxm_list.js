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

    function tab(x, y, z, a) {
        $(z).eq(1).addClass("curent").siblings().removeClass();
        $(a).eq(1).show().siblings().hide()
        $(x).click(function () {
            let num = $(this).index();
            $(this).addClass("curent").siblings().removeClass();
            $(y).eq(num).show().siblings().hide()
        })
    }
    tab(".yang .yang1 ul li", ".yang .yang2 ul", ".yang .yang1 ul", ".yang .yang2")
    tab(".dianping .tab ul li", ".dianping .tab1 ul", ".dianping .tab ul", ".dianping .tab1");
    $('.yangzong .js ul').mouseover(function () {
        $(this).stop().animate({
            height: '400px'
        }, 500)
    })
    $('.yangzong .js ul').mouseout(function () {
        $(this).stop().animate({
            height: '150px'
        }, 500)
    })
    $(window).scroll(function () {
        let num = $(".dianping").offset().top;
        let num1 = $(document).scrollTop()
        if (num1 > num) {
            $(".huojian").show()
        } else {
            $(".huojian").hide()
        }
    })
    $(".huojian").click(function () {
        $("html,body").stop().animate({
            scrollTop: 0,
        }, 300)
    })


})