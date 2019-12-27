$(function(){
    console.log("%c%c网站名称%c大众点评", "line-height:28px;", "line-height:28px;padding:4px;background:#222;color:#fff;font-size:16px;margin-right:15px", "color:#3fa9f5;line-height:28px;font-size:16px;");
	console.log("%c%c网站地址%cwww.dianping.com", "line-height:28px;", "line-height:28px;padding:4px;background:#222;color:#fff;font-size:16px;margin-right:15px", "color:#ff9900;line-height:28px;font-size:16px;");
	console.log("%c%c开发团队%c自己猜啊", "line-height:28px;", "line-height:28px;padding:4px;background:#222;color:#fff;font-size:16px;margin-right:15px", "color:#008000;line-height:28px;font-size:16px;");
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

})