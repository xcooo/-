$(function () {
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
            // 添加默认图片
            // $('body').css('backgroundImage', 'url(../images/bg0.jpg)')
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

    // 轮播图功能
    // 1.动态生成小圆圈  有几张图片 我就生成几个小圆圈
    var ul = document.querySelector('.focusImg');
    var ol = document.querySelector('.circle');
    var focus = document.querySelector('.focus_top')
    var focusWidth = focus.offsetWidth;

    // 当我们鼠标移动到图片上 停止轮播
    focus.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null; // 清除定时器变量
    })
    // 鼠标离开 开始轮播
    focus.addEventListener('mouseleave', function () {
        timer = setInterval(move, 3000);
    })

    for (var i = 0; i < ul.children.length; i++) {
        // 创建节点
        var li = document.createElement('li')
        // 记录当前小圆圈的索引号, 通过自定义属性来做
        li.setAttribute('index', i);
        // 添加节点
        ol.appendChild(li)
        // 2.小圆圈的排他思想 我们可以在生成小圆圈的同时绑定点击事件
        li.addEventListener('click', function () {
            // 干掉所有人  把所有的小li 清除 current 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'point';
            // 5.点击小圆圈, 移动图片 当然移动的是ul
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个小li 的索引号 给 num
            num = index;
            // 当我们点击了某个小li 就要把这个小li 的索引号 给 circle
            circle = index;
            animate(ul, -index * focusWidth);
        })

    }
    // 第一个小圆圈需要添加 current类
    ol.children[0].className = 'point';

    // 3.克隆第一张图片(li) 放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 4.自动轮播功能
    var num = 0
    // circle 控制小圆圈的播放
    var circle = 0;
    function move() {
        // 如果走到了最后复制的一张图片, 此时 我们的ul 要快速复原 left 改为 0
        if (num == ul.children.length - 1) {
            // 瞬间定位第一张
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
        // 5.点击右侧按钮, 小圆圈跟随变化 可以再声明一个变量控制小圆圈的播放
        circle++;
        // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
        if (circle == ol.children.length) {
            circle = 0;
        }
        // 干掉所有人  先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下我自己  留下当前的小圆圈的current类名
        ol.children[circle].className = 'point';
    }
    var timer = setInterval(move, 3000);

    // 动画函数
    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                callback && callback();
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }

    // 团队介绍
    $('.xc_team').click(function () {
        if ($(this).html() == '项目简介') {
            // 轮播图模块宽度变为0
            $('.focus').animate({
                width: 0
            }, 1000, function () {
                // 轮播图模块隐藏
                $('.focus').css('display', 'none')
                // dropdown下拉菜单隐藏
                $('.dropdown .dd').slideUp(500)
            })
            // 底层选项卡淡入
            var num = 0
            var timer = setInterval(function () {
                if (num == 1) {
                    clearInterval(timer)
                    num = 0
                } else {
                    num += 0.5
                    $('.module-banner-tab-list-box').css('opacity', num)
                }
            }, 500)

            $(this).html('关闭详情');
            $(this).css('backgroundColor', 'pink');
        } else if ($(this).html() == '关闭详情') {
            // 底层选项卡淡出
            var timer2 = setInterval(function () {
                num = $('.module-banner-tab-list-box').css('opacity')
                if (num > 0) {
                    num -= 0.5
                    $('.module-banner-tab-list-box').css('opacity', num)
                } else {
                    clearInterval(timer2)
                }
            }, 500)
            // dropdown下拉菜单隐藏
            $('.dropdown .dd').slideDown(500, function () {
                // 轮播图模块隐藏
                $('.focus').css('display', 'block')
                // 轮播图模块宽度变为原来的位置
                $('.focus').animate({
                    width: '770px'
                }, 1000)
            })
            $(this).html('项目简介');
            $(this).css('backgroundColor', '#f63');
        }

    })

    // 谢谢观看关闭功能
    $('.qianduan').click(function () {
        // 底层选项卡淡出
        var timer2 = setInterval(function () {
            var num = $('.module-banner-tab-list-box').css('opacity')
            if (num > 0) {
                num -= 0.5
                $('.module-banner-tab-list-box').css('opacity', num)
            } else {
                clearInterval(timer2)
            }
        }, 500)
        // dropdown下拉菜单隐藏
        $('.dropdown .dd').slideDown(500, function () {
            // 轮播图模块隐藏
            $('.focus').css('display', 'block')
            // 轮播图模块宽度变为原来的位置
            $('.focus').animate({
                width: '770px'
            }, 1000)
        })
        $('.xc_team').html('项目简介');
        $('.xc_team').css('backgroundColor', '#f63');
    })

    // 谢谢观看显示功能
    // $('.module-tab-nav li').eq(2).click(function () {
    //     // 谢谢观看淡入
    //     var num = 0
    //     var timer3 = setInterval(function () {
    //         if (num >= 1) {
    //             clearInterval(timer3)
    //             num = 0
    //         } else {
    //             num += 0.5
    //             $('.module-tab-box-ma .qianduan img').css('opacity', num)
    //         }
    //     }, 500)
    // })

    // 选项卡切换功能
    $('.hd li').click(function () {
        $(this).css({ 'height': 255 })
        $(this).siblings('li').css('height', 140)
        $(this).addClass('on').siblings().removeClass()
        // 1. 得到当前小li 的索引号
        var index = $(this).index();;
        // 2.让我们右侧的盒子相应索引号的图片显示出来就好了
        $('.module-banner-tab-list-box').eq(index).show().siblings().hide();
    })

})