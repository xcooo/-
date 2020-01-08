$(function () {
    // 渲染页面数据
    load();

    // 预加载
    setTimeout(function () {
        $('body').addClass('loaded');
        $('.load_bg').fadeOut()
        // $('#loader-wrapper .load_title').remove();
    }, 1200)

    // 隔行变色
    $('.baby_lists_bottom .baby_shop:odd').css('backgroundColor', '#f8f8f8')
    $('.baby_lists_bottom .baby_shop:even').css('backgroundColor', '#eee')
    var backgroundColor = null;
    $('.baby_lists_bottom .baby_shop').hover(function () {
        // 鼠标进入的时候, 把颜色记录下来
        backgroundColor = $(this).css('backgroundColor')
        $(this).css('backgroundColor', '#ccc');
    }, function () {
        // 鼠标离开的时候, 变回原来的颜色
        $(this).css('backgroundColor', backgroundColor);
    })

    // 鼠标经过图像,  更换头像的文字下滑 背景变灰
    $('.mod_img').mouseenter(function () {
        $(this).css('opacity', 0.8)
        $('.uexpand ').css({ 'color': 'orange' })
        $('.uexpand ').stop().animate({
            top: '47%'
        }, 500)
    })
    $('.mod_img').mouseleave(function () {
        $(this).css('opacity', 1)
        $('.uexpand ').css({ 'color': '#fff' })
        $('.uexpand ').stop().animate({
            top: '-5%'
        }, 500)
    })

    // 选项卡切换功能
    $('.info_left li').click(function () {
        var index = $(this).index();
        $('.info_right .info_right_lists').eq(index).show().siblings().hide()
    })

    // 更换头像功能
    // 1.鼠标点击背景, 背景模块显示
    $('.uexpand').click(function () {
        $('.bg_tx').slideDown().fadeIn(500);
        $('.set-tx').slideDown(500).fadeIn(500);
    });
    // 2.点击关闭按钮 背景模块隐藏
    $('#closeBtntx').click(function () {
        $('.bg_tx').slideUp(500).fadeOut(500);
        $('.set-tx').slideUp(500).fadeOut(500);
    });
    // 3.经过某个图片时, 突出显示
    $('.wraptx li').hover(function () {
        $(this).siblings().stop().fadeTo(400, 0.5);
    }, function () {
        // 鼠标离开, 其它li 透明度改为1
        $(this).siblings().stop().fadeTo(400, 1);
    });
    // 4.点击某个图片时, 就更换为背景图
    $('.wraptx>ul').on('click', 'li', function () {
        var index = $(this).index()
        src = $(this).find('img').prop('src');
        // 获取本地存储的数据
        var data = getDate()
        // 保存到本地存储
        saveDate(src);
        // 移除默认头像
        // $('body').removeClass('bgImg')
        // 重新渲染页面
        load();
        $('.bg_tx').slideUp(500).fadeOut(500);
        $('.set-tx').slideUp(500).fadeOut(500);
    });

    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getData_user();
        // 如果已经登录了, 才能进入个人中心
        if (data) {
            // 设置本地存储的图片
            var data = getDate()
            $('.avatar img').prop('src', data)
        } else {
            // 添加默认头像
            // 获取当前目录
            var strPath = location.href.substring(0, location.href.lastIndexOf('/'));
            // 设置头像img
            $('.avatar img').attr("src", strPath + '/img/tx.png');
            // 只有登录的用户才能进入个人中心  需要重定向到登陆页
            location.assign(strPath + '/xc_list.html')
        }
    }
    // 读取本地用户名数据
    function getData_user() {
        var data = localStorage.getItem("data");
        var data = JSON.parse(data);        
        return data;
    }

    // 读取本地存储的图片数据 
    function getDate() {
        var data = localStorage.getItem("xcimg");
        var data = JSON.parse(data)
        return data;
    }
    // 保存本地存储数据
    function saveDate(src) {
        localStorage.setItem("xcimg", JSON.stringify(src));
    }

    // 封装删除个人中心本地数据的函数
    function removeData_info() {
        localStorage.removeItem('data');
        // 我要退出模块淡出
        $('.logout_main').hide();
        // 添加默认文字
        var html_lists = '你好，请登录';
        $('.login_main').html(html_lists);
        // 顶部登录注册显示
        $('.login_main').show();
        $('.register_main').show();

        // 首页已完成数据渲染
        // 获取当前目录
        var strPath = location.href.substring(0, location.href.lastIndexOf('/'));
        // 还原默认头像
        $('.avatar img').attr("src", strPath + '/img/tx.png');
        // 首页文字添加默认文字
        var html_list = '你好';
        $('.hello').html(html_list);

        // 个人中心文字改为默认文字
        $('.user_info').html(html_lists)
    };

    // 用户退出个人中心 刷新页面
    $('.user_logout').click(function () {
        // 删除本地数据
        removeData_info()
        // 获取当前目录
        // var strPath = location.href.substring(0, location.href.lastIndexOf('/'));
        // location.assign(strPath + '/xc_list.html')
        location.reload()
    })
})