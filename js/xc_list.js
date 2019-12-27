$(function () {
    // 全部分类显示隐藏功能
    // 必须要给显示的父级元素添加事件
    $('.dropdown').mouseenter(function () {
        $(this).children('.dd').show()
    })
    $('.dropdown').mouseleave(function () {
        $(this).children('.dd').hide()
    })

    // 选项卡功能
    // 1. 鼠标点击
    $('.container-title div').click(function () {
        $(this).addClass('active').siblings().removeClass()
        // 2. 得到当前小li 的索引号
        var index = $(this).index();
        // 3.让我们右侧的盒子相应索引号的图片显示出来就好了
        $('.activity-lists-wraper ul').eq(index).show().siblings().hide();
    })
})