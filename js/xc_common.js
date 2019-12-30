$(function () {
    console.log("%c%c网站名称%c大众点评", "line-height:28px;", "line-height:28px;padding:4px;background:#222;color:#fff;font-size:16px;margin-right:15px", "color:#3fa9f5;line-height:28px;font-size:16px;");
    console.log("%c%c网站地址%cwww.dianping.com", "line-height:28px;", "line-height:28px;padding:4px;background:#222;color:#fff;font-size:16px;margin-right:15px", "color:#ff9900;line-height:28px;font-size:16px;");
    console.log("%c%c开发团队%c自己猜啊", "line-height:28px;", "line-height:28px;padding:4px;background:#222;color:#fff;font-size:16px;margin-right:15px", "color:#008000;line-height:28px;font-size:16px;");
    // 下拉菜单显示隐藏功能
    $('.nav>.item').mouseenter(function () {
        $(this).children('a').addClass('current').siblings('ul,.big_menu').stop().slideDown()
    })
    $('.nav>.item').mouseleave(function () {
        $(this).children('a').removeClass('current').siblings('ul,.big_menu').stop().slideUp()
    })

    // 菜单右侧选项卡显示隐藏功能
    $('.menu-item').mouseenter(function () {
        $(this).children('.sec-cate').show()
    })
    $('.menu-item').mouseleave(function () {
        $(this).children('.sec-cate').hide()
    })

    // 切换背景功能
    load();
    // 1.鼠标点击背景, 背景模块显示
    $('.expand').click(function () {
        $('.bg').slideDown().fadeIn(500);
        $('.set-bg').slideDown(500).fadeIn(500);
    });
    // 2.点击关闭按钮 背景模块隐藏
    $('#closeBtn').click(function () {
        $('.bg').slideUp(500).fadeOut(500);
        $('.set-bg').slideUp(500).fadeOut(500);
    });
    // 5.点击bg-title  恢复默认背景
    $('.bg-title').click(function () {
        // 清空本地存储
        localStorage.removeItem('index')
        // 页面刷新重载
        load();
        $('.bg').slideUp(500).fadeOut(500);
        $('.set-bg').slideUp(500).fadeOut(500);
        location.reload(true);
    })
    // 3.经过某个图片时, 突出显示
    $('.wrap li').hover(function () {
        $(this).siblings().stop().fadeTo(400, 0.5);
    }, function () {
        // 鼠标离开, 其它li 透明度改为1
        $(this).siblings().stop().fadeTo(400, 1);
    });
    // 4.点击某个图片时, 就更换为背景图
    $('.wrap>ul').on('click', 'li', function () {
        var index = $(this).index()
        src = $(this).find('img').prop('src');
        // 获取本地存储的数据
        var data = getDate()
        // 保存到本地存储
        saveDate(src);
        // 移除默认背景颜色
        $('body').removeClass('bgImg')
        // 重新渲染页面
        load();
        $('.bg').slideUp(500).fadeOut(500);
        $('.set-bg').slideUp(500).fadeOut(500);
    });
    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        if (data) {
            // 设置本地存储的图片
            $('body').css('background', 'url(' + data + ') top center fixed')
            $('body').css('background-size', 'cover')
        } else {
            // 添加默认背景颜色
            $('body').css('bacfroundColor', '#EFEFEF')
        }
    }
    // 读取本地存储的数据 
    function getDate() {
        var data = localStorage.getItem("index");
        return data;
    }
    // 保存本地存储数据
    function saveDate(src) {
        localStorage.setItem("index", JSON.stringify(src));
    }


    // 公共顶部登录功能 (包含首页登录显示)
    // 渲染数据
    load_index()

    // 读取本地存储的函数
    function getData_index() {
        var data = localStorage.getItem("data");
        var data = JSON.parse(data);
        return data;
    }

    // 渲染数据的函数
    function load_index() {
        // 读取本地存储的数据
        var data = getData_index();
        if (data) {
            // 公共顶部完成数据渲染
            // 登录按钮换成本地存储的数据
            $('.login_main').html(data);
            // 注册模块隐藏
            $('.register_main').hide();
            // 我要退出模块显示
            $('.logout_main').show();

            // 首页已完成数据渲染
            // 获取当前目录
            var strPath = location.href.substring(0, location.href.lastIndexOf('/'));
            // 设置头像img
            $('.avatar img').attr("src", strPath + '/img/xc.jpg');
            // 文字发生变化
            // 设置本地存储的数据
            $('.hello').html(data);
        }else {
            // 默认
            removeData_top()
        }
    };

    // 封装删除公共顶部本地数据的函数
    function removeData_top() {
        localStorage.removeItem('data');
        // 我要退出模块淡出
        $('.logout_main').hide();
        // 添加默认文字
        var html_list = '你好，请登录';
        $('.login_main').html(html_list);
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
    };

    // 如果点击退出登录 清空本地数据
    $('.logout_main').click(function(){
        removeData_top();
        // 需要刷新页面
        location.reload()
    })

    // 点击 登录 或者 注册按钮需要显示登陆注册表单
    $('.login_main').click(function(){
        // 登录表单显示
        if ($(this).html() == '你好，请登录') {
            $('.login_bg').slideDown(500, function () {
                // 显示登录表单
                $('.sub_login').fadeIn()
            })
        }
        
    });
    
    $('.register_main').click(function(){
        // 注册表单显示
        if ($(this).html() == '免费注册') {
            $('.login_bg').slideDown(500, function () {
                // 显示注册表单
                $('.sub_register').fadeIn()
            })
        }
    })

})