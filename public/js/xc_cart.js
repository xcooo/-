$(function () {
    // 渲染购物车数据
    load_cart()

    // 预加载
    setTimeout(function () {
        $('body').addClass('loaded');
        $('.load_bg').fadeOut()
        // $('#loader-wrapper .load_title').remove();
    }, 1200)

    // 火箭返回顶部
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

    // 保存价格本地存储的函数
    function save_price(price) {
        localStorage.setItem("price", JSON.stringify(price));
    }
    // 封装删除公共顶部本地数据的函数
    function remove_price() {
        localStorage.removeItem('price');
    }

    // 获取用户是否已经登录
    function getData_index() {
        var data = localStorage.getItem("data");
        var data = JSON.parse(data);
        return data;
    }

    // 点击结算, 跳转到免单页面
    $('.btn-area').click(function () {
        var data = getData_index()
        var price = $('.price-sum em').html()
        var price = parseFloat(price.substr(1)).toFixed(2);
        if (price == 0) {
            $('.btn-area').html('当前没有要结算的商品')
            $('.btn-area').css('backgroundColor', '#ccc')
        }
        // 判断当前用户是否登录 已经商品是否为空
        if (price != 0 && data) {
            location.assign('../xc_order.html')
        } else {
            // alert('你需要登录')
            $('.login_main').click()
        }
    })

    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("datalist", JSON.stringify(data));
    }

    // 读取本地购物车存储的数据 
    function getDate() {
        var data = localStorage.getItem("datalist");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            // 空购物车显示
            $('.cart-item-list').css('minHeight', 0)
            $('.car_default').show()
            // return [];
        }
    }

    // 读取本地用户的函数
    function getUser() {
        var data = localStorage.getItem("data");
        return JSON.parse(data)
    }

    // 动态渲染购物车数据
    function load_cart() {
        // 读取本地存储的数据
        var data = getDate();
        if (data) {
            // 隐藏购物车
            $('.car_default').hide()
            // 先清空数据列表页的数据
            $('.cart-item-list').empty()
            // 遍历这个数据  拼接数据
            $.each(data, function (i, n) {
                $('.p-img img').attr('src', n.shop_img)
                $('.cart-item-list').append("<li> <img src=" + n.shop_img + " ><a href='javascript:;' id=" + n.id + ">" + n.shop_title + "</a><p>" + n.shop_price + "</p><a href='javascript:;' class='remove'>删除</a></li>")
                getPirce()
            })
        }
    }

    // 删除本地数据的函数  恢复原来的样式
    function removeData() {
        localStorage.removeItem('datalist')
    }

    // 删除单个商品数据
    $('.cart-item-list li .remove').click(function () {
        // 获取本地数据
        var datas = getDate();
        // 1.先删除列表中的数据
        $(this).parents('li').remove()

        // 需要获取时间戳对应的商品
        var id = $(this).siblings("a").attr("id");
        // 2.删除本地存储 key 对应的对象  暂时不做

        // 渲染页面价格
        getPirce()
    })

    // 清空商品
    $('.clear-all').click(function () {
        // 读取数据
        var data = getDate();
        // 删除列表数据
        $('.cart-item-list').empty()
        // 清空本地存储
        removeData()
        // 渲染页面
        load_cart()
        // 空购物车显示
        $('.cart-item-list').css('minHeight', 0)
        $('.car_default').show()
        getPirce()
    })

    // 本地存储价格的函数
    function savePrice(data) {
        localStorage.setItem("price", JSON.stringify(data));
    }

    getPirce()
    // 获取总价格
    function getPirce() {
        var money = 0; // 计算总价钱
        $(".cart-item-list li p").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
        // 将总价保存到本地
        savePrice("￥" + money.toFixed(2))
        if (money == 0) {
            $('.cart-item-list').css('minHeight', 0)
            $('.car_default').show()
        }
    }

    // 图片高亮
    $('.shop_cars').on('mouseenter', 'li', function () {
        $(this).siblings().stop().fadeTo(400, 0.5);
    })
    $('.shop_cars').on('mouseleave', 'li', function () {
        $(this).siblings().stop().fadeTo(400, 1);
    })

})