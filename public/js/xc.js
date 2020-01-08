$(function(){
    // 下拉菜单显示隐藏功能
    $('.nav>.item').mouseenter(function(){
        $(this).children('a').addClass('current').siblings('ul,.big_menu').stop().slideDown()
    })
    $('.nav>.item').mouseleave(function(){
        $(this).children('a').removeClass('current').siblings('ul,.big_menu').stop().slideUp()
    })

    // 菜单右侧选项卡显示隐藏功能
    $('.menu-item').mouseenter(function(){
        $(this).children('.sec-cate').show()
    })
    $('.menu-item').mouseleave(function(){
        $(this).children('.sec-cate').hide()
    })


    // 全部分类显示隐藏功能
    // 必须要给显示的父级元素添加事件
    $('.dropdown').mouseenter(function(){
        $(this).children('.dd').stop().slideDown()
    })
    $('.dropdown').mouseleave(function(){
        $(this).children('.dd').stop().slideUp()
    })
})