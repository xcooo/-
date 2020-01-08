$(function () {

    //点击隐藏菜单部分导航栏
    $('.lhj-listnav h5').click(function () {
        if ($('.lhj-listnav h5').html() == '更多') {
            $(this).siblings('ol').show();
            $('.lhj-listnav h5').html('收起')
        } else {
            $(this).siblings('ol').hide();
            $('.lhj-listnav h5').html('更多')
        }
    });

    //分类部分切换
    $('.lhj-listnav ul a').click(function () {
        $(this).addClass("pass-card").parent().siblings().children().removeClass("pass-card")
    })

    //地点部分tab栏切换
    $('.tabnav-list li').click(function () {
        $(this).addClass("card").siblings().removeClass("card");
        var index = $(this).index();
        $('.lhj-tabnav-con .item-s').eq(index).show().siblings().hide();
    });

    //大全部分背景切换
    $('.didian-nav span').mouseover(function () {
        $(this).addClass("ez").parent().siblings().children().removeClass("ez");
        var index = $(this).parent().index();
        $('.lhj-city-content .lhj-citycon-list').eq(index).show().siblings().hide();
    });

    //排行部分背景切换
    $('.ranking-nav span').mouseover(function () {
        $(this).addClass("ez").parent().siblings().children().removeClass("ez");
        var index = $(this).parent().index();
        $('.lhj-ranking-s .lhj-ranking-list').eq(index).show().siblings().hide();
    })

    //收藏部分隐藏
    $('.lhj-shopnav-list li').mouseover(function () {
        $(this).css('background', '#F8F8F8');
        $(this).children('.lhj-shopnav-collecting').show();
    })
    $('.lhj-shopnav-list li').mouseout(function () {
        $(this).css('background', '#fff');
        $(this).children('.lhj-shopnav-collecting').hide();
    })

    
    // 全部分类显示隐藏功能
    // 必须要给显示的父级元素添加事件
    $('.dropdown').mouseenter(function () {
        $(this).children('.dd').show()
    })
    $('.dropdown').mouseleave(function () {
        $(this).children('.dd').hide()
    })

    // 预加载
    setTimeout(function () {
        $('body').addClass('loaded');
        $('.load_bg').fadeOut()
        // $('#loader-wrapper .load_title').remove();
    }, 1200)

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