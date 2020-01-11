$(function () {
    // 渲染页面数据
    load_login()

    // 预加载
    setTimeout(function () {
        $('body').addClass('loaded');
        $('#loader-wrapper .load_title').remove();
    }, 1000)

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
        $('.activity-lists-wraper .activity-lists').eq(index).show().siblings().hide();
        // 获取对应的盒子的高度
        var more_lists_height = $('.activity-lists-wraper .activity-lists').eq(index).css('height')
        // 对盒子高度做特殊处理
        var more_lists_height = Number(more_lists_height.replace('px', ''))

        if (more_lists_height > 1300) {
            // 加载更多模块显示
            $('.load-more').show()
            // 盒子高度设置为1300 溢出隐藏
            // $('.activity-lists-wraper .activity-lists').eq(index).css({ 'height': 1300, 'overflow': 'hidden' })
        } else {
            // 加载更多模块隐藏
            $('.load-more').hide()
        }
    })

    // 下拉事件  选项卡变为固定定位
    // var wrapTop = $(".news-container").offset().top;
    // $(window).scroll(function () {
    //     if ($(document).scrollTop() >= wrapTop) {
    //         // 变为固定定位
    //         $('.s-fix-wrap').css({ 'position': 'fixed', 'left': 170, 'top': 0, 'zIndex': 200, 'width': 871 })
    //         $('.activity-lists-wraper').css({ 'marginTop': 95.5 })
    //     } else {
    //         $('.s-fix-wrap').css({ 'width': 871, 'backgroundColor': '#F6F6F6', 'position': 'static', 'width': 871 })
    //         $('.activity-lists-wraper').css({ 'marginTop': 0 })
    //     }
    // });

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
    // 保存本地图片数据
    function saveData_img() {
        data = getData_img()
        if(data){
            localStorage.setItem("xcimg", JSON.stringify(data));
        }else {
            var strPath = location.href.substring(0, location.href.lastIndexOf('/'))
            var src = strPath + '/img/tx.png'
            localStorage.setItem("xcimg", JSON.stringify(src));
        }
    }

    // 读取本地图片数据
    function getData_img() {
        var data = localStorage.getItem("xcimg");
        var data = JSON.parse(data);
        return data;
    }

    // 渲染加载数据
    function load_login() {
        saveData_img()
        // 读取本地存储的数据
        var data = getData();
        if (data) {
            // 设置本地存储的数据
            // 获取用户名 
            var data = getData()[0]   
            $('.l3').html(data)
            // 设置去向个人中心的连接
            // 获取当前目录
            // var strPath = location.href.substring(0, location.href.lastIndexOf('/'));
            $('.l3').attr({ 'href': 'xc_info', 'title': '点这里进入个人中心' })
            $('.logout').show()
            // 获取当前本地图片
            xcimg = getData_img()
            // 设置本地头像img
            $('.avatar img').attr("src", xcimg);
        } else {
            // 调用删除本地数据的函数  恢复原来的样式
            removeData()
        }
    }

    // 删除本地数据的函数  恢复默认样式
    function removeData() {
        localStorage.removeItem('data')
        // 登出模块淡出
        $('.logout').hide()
        // 添加默认文字
        var html_list = '立即登录'
        $('.l3').html(html_list)
        $('.l3').attr({ 'href': 'javascript:;', 'title': '登录你的账号吧' })
        // 获取当前目录
        var strPath = location.href.substring(0, location.href.lastIndexOf('/'))

        // 还原默认头像
        $('.avatar img').attr("src", '../img/tx.png')
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

    // 轮播图封装调用
    var banner = new FragmentBanner({
        container: "#banner1",//选择容器 必选
        imgs: ['./uploads/list.jpg', './uploads/list2.jpg', './uploads/list3.jpg', './uploads/list4.jpg', './uploads/list5.jpg'],//图片集合 必选
        size: {
            width: 870,
            height: 350
        },//容器的大小 可选
        //行数与列数 可选
        grid: {
            line: 12,
            list: 14
        },
        index: 0,//图片集合的索引位置 可选
        type: 2,//切换类型 1 ， 2 可选
        boxTime: 5000,//小方块来回运动的时长 可选
        fnTime: 10000//banner切换的时长 可选
    });


})