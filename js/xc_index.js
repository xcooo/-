$(function () {
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

    // 团队介绍  添加节流阀  防止频繁点击
    var flag = true;
    $('.xc_team').click(function () {
        if ($(this).html() == '项目简介') {
            flag = false;
            // 轮播图模块宽度变为0
            $('.focus').stop().animate({
                width: 0
            }, 1000, function () {
                // 轮播图模块隐藏
                $('.focus').css('display', 'none')
                // dropdown下拉菜单隐藏
                $('.dropdown .dd').stop().slideUp(500, function () {
                    $('.xc_team').html('关闭详情');
                    $('.xc_team').css('backgroundColor', 'pink');
                    flag = true
                })
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
        }
        if (flag) {
            if ($('.xc_team').html() == '关闭详情') {
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
                $('.dropdown .dd').stop().slideDown(500, function () {
                    // 轮播图模块隐藏
                    $('.focus').css('display', 'block')
                    // 轮播图模块宽度变为原来的位置
                    $('.focus').stop().animate({
                        width: '770px'
                    }, 1000, function () {
                        $('.xc_team').html('项目简介');
                        $('.xc_team').css('backgroundColor', '#f63');
                    })
                })

            }
        }

    })

    // 谢谢观看关闭功能
    $('.qianduan').click(function () {
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
        $('.dropdown .dd').stop().slideDown(500, function () {
            // 轮播图模块隐藏
            $('.focus').css('display', 'block')
            // 轮播图模块宽度变为原来的位置
            $('.focus').stop().animate({
                width: '770px'
            }, 1000, function () {
                $('.xc_team').html('项目简介');
                $('.xc_team').css('backgroundColor', '#f63');
            })
        })
    })

    // 选项卡切换功能
    $('.hd li').click(function () {
        $(this).css({ 'height': 255 })
        $(this).siblings('li').css('height', 140)
        $(this).addClass('on').siblings().removeClass()
        // 1. 得到当前小li 的索引号
        var index = $(this).index();;
        // 2.让我们右侧的盒子 相应索引号的图片显示出来就好了
        $('.module-banner-tab-list-box').eq(index).show().siblings().hide();
    })

    // 电梯导航功能
    var flag = true;
    // 1.显示隐藏电梯导航
    var toolTop = $(".meishi_container").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop - 20) {
            $(".cata-nav").fadeIn();
        } else {
            $(".cata-nav").fadeOut();
        };
    }

    $(window).scroll(function () {
        toggleTool();
        // 3. 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
        if (flag) {
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".cata-nav li").eq(i).children('a').addClass("current-nav");
                    $(".cata-nav li").eq(i).siblings('li').children('a').removeClass("current-nav");
                }
            })
        }
    });

    // 2. 点击电梯导航页面可以滚动到相应内容区域
    $(".cata-nav li").click(function () {
        flag = false;
        console.log($(this).index());
        // 当我们每次点击小li 就需要计算出页面要去往的位置 
        // 选出对应索引号的内容区的盒子 计算它的.offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        });
        // 点击之后，让当前的小li 添加current 类名 ，姐妹移除current类名
        $(this).children('a').addClass("current-nav");
        $(this).siblings('li').children('a').removeClass("current-nav");
    })

    // 返回顶部功能
    $(".nav-end").click(function () {
        $("body, html").stop().animate({
            scrollTop: 0
        });
    })

    // 美食模块动画显示功能
    var meishiTop = $(".focus_bottom").offset().top;
    $(window).scroll(function () {
        if ($(document).scrollTop() >= meishiTop) {
            $('.meishi_right').animate({
                width: '590px'
            }, 1000, function () {
                $('.meishi_left .cata-con').animate({
                    height: '400px'
                }, 1000, function () {
                    $('.cata-shop-item').eq(6).css('display', 'none')
                    $('.cata-shop-item').eq(7).css('display', 'none')
                    $('.cata-shop-item').eq(8).css('display', 'none')
                })
            })
        }
    });

    // 丽人模块动画功能
    var lirenTop = $(".pic-two .pic-con").offset().top;
    $(window).scroll(function () {
        if ($(document).scrollTop() >= lirenTop) {
            $('.liren_left').animate({
                width: '590px',
            }, 1000, function () {
                $('.liren_right').animate({
                    width: '590px',
                    height: '470px'
                }, 1200)
            })
        }
    });

    // 头像旋转
    $('.card a img').mouseenter(function () {
        $(this).css('rotate', '360deg')
    })

})