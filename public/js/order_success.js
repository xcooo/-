$(function () {
    // 预加载
    setTimeout(function () {
        $('body').addClass('loaded');
        $('.load_title1').hide()    
        $('.load_title2').show()
        // $('#loader-wrapper .load_title').remove();
    }, 1500)
   
    // 渲染数据
    load_order()

    // 全部分类显示隐藏功能
    // 必须要给显示的父级元素添加事件
    // $('.dropdown').mouseenter(function () {
    //     $(this).children('.dd').show()
    // })
    // $('.dropdown').mouseleave(function () {
    //     $(this).children('.dd').hide()
    // })

    // 读取本地存储的函数 登录名是否存在
    function getData_index() {
        var data = localStorage.getItem("data");
        var data = JSON.parse(data);
        return data;
    }

    // 读取本地图片数据
    function getData_img() {
        var data = localStorage.getItem("xcimg");
        var data = JSON.parse(data);
        return data;
    }

    // 获取当前价格数据
    function getData_price() {
        var data = localStorage.getItem("price");
        var data = JSON.parse(data);
        return data;
    }

    // 封装删除公共顶部本地数据的函数
    function remove_price() {
        localStorage.removeItem('price');
    }
    // 渲染数据的函数
    function load_order() {
        // 读取本地存储的数据
        var data = getData_index();
        if (data) {
            var data = getData_index()[0]
            // 渲染订单页数据
            $('.order_user').html(data)
            var price = getData_price()
            $('.order_mon').html(price)
        } else {
            // 默认
            var html_list = ''
            $('.order_user').html(html_list)
        }
    };
})