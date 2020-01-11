$(function () {
    // 定义全局主机地址和端口
    var hosts = 'http://192.168.31.39:5000'

    // 注册登陆输入框逻辑实现
    // 获得焦点  文字位置和大小发生变化
    $('.sub-main-w3 input').focus(function () {
        $(this).siblings('.input_tip').css({ 'top': 42, 'left': 5, 'fontSize': '10px' })
    })
    $('.input_tip').click(function () {
        $(this).css({ 'top': 42, 'left': 5, 'fontSize': '10px' })
    })

    // 失去焦点  文字位置和大小变回原来的位置 并判断输入框是否有文字
    $('.sub-main-w3 input').blur(function () {
        if ($(this).val().length != 0) {
            $(this).siblings('.input_tip').css({ 'top': 42, 'left': 5, 'fontSize': '10px' })
        } else {
            $(this).siblings('.input_tip').css({ 'top': 54, 'left': 15, 'fontSize': '15px' })
        }
    })
    // 注册登陆表单切换功能
    $('.sub-main-w3 a').click(function () {
        // 1.如果当前是登陆框, 点击之后则跳到注册框
        if ($(this).children('em').html() == '立即注册') {
            $('.sub_login').stop().slideUp()
            $('.sub_register').stop().slideDown()
        } else {
            // 2.如果当前是注册框, 点击之后则跳到登陆框
            $('.sub_login').stop().slideDown()
            $('.sub_register').stop().slideUp()
        }
    })

    // 重置表单的函数
    function formReset() {
        $('#myform').val = ''
    }

    // 登录注册表单请求
    // 实现前端注册验证逻辑
    var error_name = true; // 非法用户名
    var error_pwd = true;   // 非法密码
    var error_check_pwd = true; // 密码不一致
    var error_check = false;  // 没有勾选

    var nc = $('#nc');
    var allow = $('#allow');
    var pwd = $('#pwd')

    var regnc = /^[\u4e00-\u9fa5]{2,8}$/;
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;
    // 用户名匹配
    userregexp(nc, regnc)
    // 密码匹配
    pwdregexp(pwd, regpwd)
    $('.input_tip').click(function () {
        $(this).siblings('input').focus()
    })
    // 用户名验证的函数
    function userregexp(ele, reg) {
        $(ele).blur(function () {
            // 1.如果用户输入了文字, 进入判断
            if ($(ele).val().length != 0) {
                if (reg.test(this.value)) {
                    $(this).siblings('span').addClass('success_icon');
                    $(this).siblings('.input_tip').html('用户名符合要求').addClass('success')
                    error_name = false;
                } else {
                    $(this).siblings('span').addClass('error_icon');
                    $(this).siblings('.input_tip').html('用户名为中文, 且为2-8位').addClass('error')
                    error_name = true;
                }
            } else if ($(ele).val().length == 0) {
                // 2.如果用户未输入, 就移开了焦点框, 文字需要重新返回原来的位置
                $(this).siblings('.input_tip').css({ 'top': 54, 'left': 15, 'fontSize': '15px' })
            }
        })
    };

    // 密码验证的函数
    function pwdregexp(ele, reg) {
        $(ele).blur(function () {
            // 1.如果用户输入了文字, 进入判断
            if ($(ele).val().length != 0) {
                if (reg.test(this.value)) {
                    $(this).siblings('span').addClass('success_icon');
                    $(this).siblings('.input_tip').html('密码长度符合要求').addClass('success')
                    error_pwd = false;
                } else {
                    $(this).siblings('span').addClass('error_icon');
                    $(this).siblings('.input_tip').html('密码不少于6位').addClass('error')
                    error_pwd = true;
                }
            } else if ($(ele).val().length == 0) {
                // 2.如果用户未输入, 就移开了焦点框, 文字需要重新返回原来的位置
                $(this).siblings('.input_tip').css({ 'top': 54, 'left': 15, 'fontSize': '15px' })
            }
        })
    };

    // 确认密码输入是否一致
    $('#surepwd').blur(function () {
        if ($(this).val().length != 0) {
            if ($(this).val() == pwd.val()) {
                $(this).siblings('span').addClass('success_icon')
                $(this).siblings('.input_tip').html('密码输入一致').addClass('success')
                // error_check_pwd = false;  // 加入这行就是bug 以后再做处理
            } else {
                $(this).siblings('span').addClass('error_icon')
                $(this).siblings('.input_tip').html('密码不一致, 请重新输入').addClass('error')
                // error_check_pwd = true;
            }
        } else if ($(this).val().length == 0) {
            $(this).siblings('.input_tip').html('确认密码')
            $(this).siblings('.input_tip').css({ 'top': 54, 'left': 15, 'fontSize': '15px' })
        }
    })

    // 是否同意已经被勾选
    allow.click(function () {
        if ($(this).is(':checked')) {
            $(this).siblings('span').html('已同意本站注册协议').addClass('success');
            error_check = false;
        } else {
            $(this).siblings('span').html('请勾选同意').addClass('error').removeClass();
            error_check = true;
        }
    });

    // 注册前端 与 后台交互
    $('.sub_register form').submit(function (e) {
        if (error_name == false && error_pwd == false && error_check == false) {
            e.preventDefault()
            // 取到用户输入的内容
            var user = $(".sub_register #nc").val()
            var pwd = $(".sub_register #pwd").val()
            var repassword = $(".sub_register #surepwd").val()

            if (!user) {
                $(this).siblings('.input_tip').html('用户名不符合要求').addClass('error')
                return;
            }
            if (!pwd || pwd.length < 6) {
                $(this).siblings('.input_tip').html('密码不少于6位').addClass('error')
                return;
            }

            var params = {
                "username": user,
                "password": pwd,
                "repassword": repassword
            }
            $.ajax({
                url: hosts + "/user/reg",
                type: "POST",
                data: params,
                // data: JSON.stringify(params),
                // contentType: "application/json", // 暂时注释起来
                success: function (resp) {
                    if (resp.code == "0") {
                        // 注册模块显示
                        $('.register_success').fadeIn(1000, function () {
                            // 切换到登陆页面
                            $('.sub_login').slideDown()
                            $('.sub_register').stop().slideUp()
                            // 注册成功的提示也隐藏
                            $('.register_success').hide()
                        })
                        // 登陆模块提示显示5秒后再隐藏
                        $('.login_success').fadeIn(10000).fadeOut(1000)
                    } else if (resp.code == "1" || resp.code == "2" || resp.code == "3" || resp.code == "4") {
                        $('.register_success').html(resp.message).show()
                        var timer = setTimeout(function () {
                            $('.register_success').html(resp.message).hide()
                        }, 3000)
                    } else {
                        $('.register_success').html('用户名或密码不符合要求').show().hide(3000)
                    }
                }
            })
        }

    });

    // 实现前端登陆逻辑
    $('.sub_login form').submit(function (e) {
        e.preventDefault()
        // 取到用户输入的内容
        var username = $('.sub_login #nc_login').val()
        var password = $('.sub_login #pwd_login').val()

        var params = {
            "username": username,
            "password": password,
        }

        $.ajax({
            url: hosts + "/user/login",
            type: "post",
            data: params,
            // contentType: "application/json",
            success: function (resp) {
                if (resp.code == "0") {
                    // 当前文字发生变化, 需要使用本地存储 刷新页面                  
                    // 设置本地数据
                    saveData(resp.message)   // message 后台传输过来的用户名和id
                    // 读取本地数据
                    getData()
                    // 渲染当前数据
                    load_login()
                    // 登陆注册表单 隐藏
                    $('.sub-main-w3').slideUp(1000)
                    $('#bg').slideUp()
                    location.reload()
                } else if (resp.code == "3") {
                    // 说明用户名或密码错误
                    $('.login_success').html(resp.message).fadeIn().fadeOut(5000)
                } else if (resp.code == "2") {
                    $('.login_success').html(resp.message).fadeIn().fadeOut(5000)
                } else {
                    $('.login_success').html('用户名或密码不能为空 !').fadeIn().fadeOut(5000)
                }
            }
        })
    });

    // 增加注册登陆表单本地存储的函数
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
            $('.logout').show()

            // 获取当前本地图片
            xcimg = getData_img()
            if (xcimg) {
                // 设置本地头像img
                $('.avatar img').attr("src", xcimg);
            } else {
                // 获取当前目录
                var strPath = location.href.substring(0, location.href.lastIndexOf('/'))
                // 设置头像img
                $('.avatar img').attr("src", strPath + '/img/tx.png')
            }

        } else {
            // 调用删除本地数据的函数  恢复原来的样式
            removeData()
        }
    }
    // 读取本地存储的函数
    function getData() {
        var data = localStorage.getItem("data");
        var data = JSON.parse(data);
        return data;
    }

    // 保存本地图片数据
    function saveData_img() {
        data = getData_img()
        if (data) {
            localStorage.setItem("xcimg", JSON.stringify(data));
        } else {
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

    // 保存本地存储数据的函数
    function saveData(data) {
        localStorage.setItem("data", JSON.stringify(data));
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

    // 修改密码
    $('.pwd_form form').submit(function (e) {
        e.preventDefault()
        // 取到用户输入的内容
        var users = $('.pwd_form #users_name').html()
        var oldpassword = $('.pwd_form #userpassword').val()
        var newpassword = $('.pwd_form #userpassword1').val()
        // 取到用户id
        var id = getData()[1]     

        var params = {
            'username': users,
            "oldpassword": oldpassword,
            "newpassword": newpassword,
            'id':id
        }

        $.ajax({
            url: hosts + "/user/updatePssword",
            type: "post",
            data: params,
            // contentType: "application/json",
            success: function (resp) {
                if (resp.code == "0") {
                    var num = 3;
                    var timer = setInterval(function () {
                        if (num == 0) {
                            // 删除本地数据
                            removeData()
                            // 需要重新登录
                            // 获取当前目录
                            var strPath = location.href.substring(0, location.href.lastIndexOf('/'));
                            location.assign('xc_list')
                            // 清除定时器
                            clearInterval(timer)
                            num = 3
                        } else {
                            num--
                            $('.modifly_pwd').val('修改成功, ' + num + '秒后返回登录页').css('backgroundColor', 'green')
                        }
                    }, 1000)
                } else if (resp.code == '1' || resp.code == '2' || resp.code == '3' || resp.code == '4' || resp.code == '5' || resp.code == '6' || resp.code == '6') {
                    alert(resp.message)
                    $('.modifly_pwd').val(resp.message).css('backgroundColor', 'red')
                } else {
                    // 说明用户名或密码错误
                    $('.modifly_pwd').val('原密码错误').css('backgroundColor', 'red')
                }
            }
        })
    })

    // 修改昵称
    $('.nc_form form').submit(function (e) {
        e.preventDefault()
        // 取到用户输入的内容
        var oldname = $('.nc_form #oldname').html()
        var newUsername = $('.nc_form #newname').val()
        // 取到用户id
        var id = getData()[1]

        var params = {
            'username': oldname,
            "newUsername": newUsername,
            'id': id
        }

        $.ajax({
            url: hosts + "/user/updateName",
            type: "post",
            data: params,
            // contentType: "application/json",
            success: function (resp) {
                if (resp.code == "0") {
                    var data = resp.message
                    // 删除本地存储
                    removeData()
                    //保存本地存储
                    saveData(data)
                    // 重新渲染页面
                    load_login()
                    // 刷新页面
                    location.reload()
                } else if (resp.code == '1' || resp.code == '2' || resp.code == '3' || resp.code == '4' || resp.code == '5' || resp.code == '6' || resp.code == '7' || resp.code == '8') {
                    $('.modifly_name').val(resp.message).css('backgroundColor', 'red')
                    var timer = setTimeout(function () {
                        $('.modifly_name').val('修改昵称').css('backgroundColor', 'green')
                    }, 2000)
                } else {
                    // 说明用户名已存在
                    $('.modifly_name').val('用户名已存在').css('backgroundColor', 'red')
                }
            }
        })
    })

    // 添加购物车模块
    // 获取商品id
    // 获取商品名称
    // 获取商品价格
    // 获取商品价格
    // 获取选中状态
    // 获取商品关联的用户
})