$(function () {
    // 预加载
    setTimeout(function () {
        $('body').addClass('loaded');
        $('.load_bg').fadeOut()
        // $('#loader-wrapper .load_title').remove();
    }, 1200)

    //团购导航栏背景切换
    $(".lhj-tuangou-nav li").mouseover(function () {
        $(this).addClass("sup");
        $(this).siblings().removeClass("sup")
    })

    //数量加减
    $(".quantity-num").val("1")
    $(".plus").click(function () {
        var n = $(this).siblings(".quantity-num").val();
        // console.log(n);
        n++;
        $(".quantity-num").val(n);


    })
    $(".minus").click(function () {
        var n = $(".quantity-num").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(".quantity-num").val(n);
    })

    //点击显示
    var nce = true;
    $(".list_box-title").click(function () {
        if (nce == true) {
            $(this).siblings(".list_box-shopdetail").show();
            $(this).siblings(".down-icon").hide();
            nce = false;
        } else {
            $(this).siblings(".list_box-shopdetail").hide();
            $(this).siblings(".down-icon").show();
            nce = true;
        }

    })


    //类似电梯导航
    $(".lhj-tab_mod li").mouseover(function () {
        $(this).addClass("trsh");
        $(this).siblings().removeClass("trsh");
    })

    $(".lhj-tab_mod li").click(function () {
        //flag = false;
        console.log($(this).index());
        // 当我们每次点击小li 就需要计算出页面要去往的位置 
        // 选出对应索引号的内容区的盒子 计算它的.offset().top
        var current = $(".lhj-box-dptg .tb").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function () {
            //flag = true;
        });
        // 点击之后，让当前的小li 添加current 类名 ，姐妹移除current类名
        //$(this).addClass("current").siblings().removeClass();
    })
    //$("li").on("click", function() {

    //})

    // 全部分类显示隐藏功能
    // 必须要给显示的父级元素添加事件
    $('.dropdown').mouseenter(function () {
        $(this).children('.dd').show()
    })
    $('.dropdown').mouseleave(function () {
        $(this).children('.dd').hide()
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