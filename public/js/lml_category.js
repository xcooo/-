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
    // 返回顶部
    $(window).scroll(function () {
        if ($(document).scrollTop() >= 5) {
            $(".to-top").show()
        } else {
            $(".to-top").hide()
        }

    })
    $(".to-top").click(function () {
        $("html,body").stop().animate({
            scrollTop: 0
        })
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