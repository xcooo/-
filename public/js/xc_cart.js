$(function () {
    // 渲染购物车数据
    load_cart()

    // // 全部分类显示隐藏功能
    // // 必须要给显示的父级元素添加事件
    // $('.dropdown').mouseenter(function () {
    //     $(this).children('.dd').show()
    // })
    // $('.dropdown').mouseleave(function () {
    //     $(this).children('.dd').hide()
    // })

    // 全选 全不选功能模块
    // 1.就是把全选按钮(checkall)的状态赋值给 三个小的按钮(j-checkbox)就可以了
    // 事件可以使用change
    // $('.checkall').change(function () {
    //     $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'));
    //     if ($(this).prop('checked')) {
    //         // 让所有的商品添加 check-cart-item 类名
    //         $('.cart-item').addClass('check-cart-item');
    //     } else {
    //         // check-cart-item 移除
    //         $('.cart-item').removeClass('check-cart-item');
    //     }
    // });
    // // 2.如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
    // $('.j-checkbox').change(function () {
    //     if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
    //         // 全选按钮勾上
    //         $('.checkall').prop('checked', true);
    //     } else {
    //         // 全选按钮取消
    //         $('.checkall').prop('checked', false);
    //     }
    //     if ($(this).prop('checked')) {
    //         // 让当前的商品添加 check-cart-item 类名
    //         $(this).parents('.cart-item').addClass('check-cart-item');
    //     } else {
    //         // check-cart-item 移除
    //         $(this).parents('.cart-item').removeClass('check-cart-item');
    //     }
    // });
    // // 3.增减商品数量  首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    // $('.increment').click(function () {
    //     // 得到当前兄弟文本框的值
    //     var num = $(this).siblings('.itxt').val();
    //     num++;
    //     $(this).siblings('.itxt').val(num);
    //     // 4.计算小计模块， 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
    //     // 获取当前商品的价格
    //     var price = $(this).parent().parent().siblings('.p-price').html()
    //     price = price.substr(1);
    //     // 保留2位小数（不够位数，则用0替补）
    //     total = (price * num).toFixed(2);
    //     // 小计模块
    //     $(this).parent().parent().siblings('.p-sum').html('￥' + total);
    //     getSum();
    // });
    // $('.decrement').click(function () {
    //     // 得到当前兄弟文本框的值
    //     var num = $(this).siblings('.itxt').val();
    //     if (num == 1) {
    //         return false;
    //     }
    //     num--;
    //     $(this).siblings('.itxt').val(num);
    //     // 4.计算小计模块， 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
    //     // 获取当前商品的价格
    //     var price = $(this).parent().parent().siblings('.p-price').html()
    //     price = price.substr(1);
    //     // 保留2位小数（不够位数，则用0替补）
    //     total = (price * num).toFixed(2);
    //     // 小计模块
    //     $(this).parent().parent().siblings('.p-sum').html('￥' + total);
    //     getSum();
    // });
    // // 5.用户修改文本框的值 计算 小计模块
    // $('.itxt').change(function () {
    //     // 取到当前文本框的值 乘以  单价
    //     var num = $(this).val();
    //     var price = $(this).parents('.p-num').siblings('.p-price').html()
    //     price = price.substr(1);
    //     // 保留2位小数（不够位数，则用0替补）
    //     total = (price * num).toFixed(2);
    //     // 小计模块
    //     $(this).parent().parent().siblings('.p-sum').html('￥' + total);
    //     getSum();
    // });
    // getSum();
    // // 6.计算总计 和 总额
    // function getSum() {
    //     var count = 0; // 总计
    //     var money = 0; // 总额
    //     $('.itxt').each(function (i, ele) {
    //         count += parseInt($(ele).val());
    //     })
    //     $('.amount-sum em').text(count);
    //     $('.p-sum').each(function (i, ele) {
    //         money += parseFloat($(ele).text().substr(1));

    //     })
    //     $('.price-sum em').text('￥' + money.toFixed(2));
    //     // 删除本地数据
    //     remove_price()
    //     // 获取本页面价格数据
    //     var price = money.toFixed(2)
    //     // 保存本地数据
    //     save_price(price)
    // };
    // // 7.删除商品模块
    // // 1.商品后面的删除按钮
    // $('.p-action a').click(function () {
    //     $(this).parents('.cart-item').remove();
    //     getSum();
    // })
    // // 2.删除选中的商品： 先判断小的复选框按钮是否选中状态，如果是选中，则删除对应的商品
    // $('.remove-batch').click(function () {
    //     $('.j-checkbox:checked').parents('.cart-item').remove();
    //     getSum();
    // })
    // // 3.清理购物车： 则是把所有的商品全部删掉
    // $('.clear-all').click(function () {
    //     $('.cart-item').remove();
    //     getSum();
    //     // 添加默认样式
    //     $('.car_default').show()
    // })



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

})