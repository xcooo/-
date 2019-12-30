$(function () {
    // 渲染页面数据
    load_login()

    // 全部分类显示隐藏功能
    // 必须要给显示的父级元素添加事件
    $('.dropdown').mouseenter(function () {
        $(this).children('.dd').show()
    })
    $('.dropdown').mouseleave(function () {
        $(this).children('.dd').hide()
    })

    // 选项卡功能
    // 鼠标点击
    $('.container-title div').click(function () {
        $(this).addClass('active').siblings().removeClass()
        // 得到当前小li 的索引号
        var index = $(this).index();
        // 让我们右侧的盒子相应索引号的图片显示出来就好了
        $('.activity-lists-wraper ul').eq(index).show().siblings().hide();
    })

    // 下拉事件  选项卡变为固定定位
    var wrapTop = $(".s-fix-wrap").offset().top;
    $(window).scroll(function () {
        if ($(document).scrollTop() >= wrapTop) {
            // 变为固定定位
            $('.s-fix-wrap').css({'position':'fixed','left':169,'top':0,'zIndex':200,'width':870})
            $('.activity-lists-wraper').css({'marginTop':95.5})
        }else {
            $('.s-fix-wrap').css({'width': 871,'backgroundColor':'#F6F6F6','position':'static','width':870})
            $('.activity-lists-wraper').css({'marginTop':0})
        }
    });

    // 点击登陆按钮 显示表单和背景
    $('.l3').click(function () {
        if ($(this).html() == '立即登录') {
            $('.login_bg').slideDown(500, function () {
                $('.sub_login').fadeIn()
            })
        }
    })

    // 读取本地存储的函数
    function getData() {
        var data = localStorage.getItem("data");
        var data = JSON.parse(data);
        return data;
    }
    // 渲染加载数据
    function load_login() {
        // 读取本地存储的数据
        var data = getData();
        if (data) {
            // 设置本地存储的数据
            $('.l3').html(data)
            $('.logout').show()
            // 获取当前目录
            var strPath = location.href.substring(0, location.href.lastIndexOf('/'))
            // 设置头像img
            $('.avatar img').attr("src", strPath + '/img/xc.jpg')
        } else {
            // 调用删除本地数据的函数  恢复原来的样式
            removeData()
        }
    }

    // 删除本地数据的函数  恢复原来的样式
    function removeData() {
        localStorage.removeItem('data')
        // 登出模块淡出
        $('.logout').hide()
        // 添加默认文字
        var html_list = '立即登录'
        $('.l3').html(html_list)
        // 获取当前目录
        var strPath = location.href.substring(0, location.href.lastIndexOf('/'))
        // 还原默认头像
        $('.avatar img').attr("src", strPath + '/img/tx.png')
        // 首页文字添加默认文字
        var html_list = '你好'
        $('.hello').html(html_list)
    }

    // 还原默认样式  加这里会出现栈溢出
    // 列表页退出功能实现
    $('.logout').click(function () {
        removeData()
        // 需要刷新页面
        location.reload()
    })
})