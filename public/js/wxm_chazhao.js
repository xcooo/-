$(function () {
    tab();
    sousuo()

    function tab() {
        $("nav span").click(function () {
            $(this).css("borderBottom", "5px solid #FFC300").siblings().css("borderBottom", "");
            var num = $(this).index("span")
            let index = $(".box").children()
            let tab = $(".box").children()
            $(tab).eq(num).show().siblings().hide()
        })
    }

    function sousuo() {
        $(".juzhong button").on("click", function () {
            let content = $(".juzhong input").val();
            console.log(content);

            if (content == "价格") {
                $("nav span").eq(1).css("borderBottom", "5px solid #FFC300").siblings().css("borderBottom", "");
                let tab = $(".box").children();
                $(tab).eq(1).show().siblings().hide()
                let child = $(tab).eq(1).children().eq(1)
                let child1 = $(tab).eq(1).children().eq(0)
                $(child).html("<ol><li>价格说明</li></ol>")
                $(child1).children().eq(0).css("backgroundColor", "#F7F7F7")
            } else if (content == "规则") {
                $("nav span").eq(1).css("borderBottom", "5px solid #FFC300").siblings().css("borderBottom", "");
                let tab = $(".box").children();
                $(tab).eq(1).show().siblings().hide()
                let child = $(tab).eq(1).children().eq(1)
                let child1 = $(tab).eq(1).children().eq(0)
                $(child).html("<ol><li>美团点评点评规则</li><li>大众点评POI信息发布和认领规则</li><li>美团买菜配送规则</li></ol>")
                $(child1).children().eq(0).css("backgroundColor", "#F7F7F7")
            } else if (content == "平台") {
                $("nav span").eq(1).css("borderBottom", "5px solid #FFC300").siblings().css("borderBottom", "");
                let tab = $(".box").children();
                $(tab).eq(1).show().siblings().hide()
                let child = $(tab).eq(1).children().eq(1)
                let child1 = $(tab).eq(1).children().eq(0)
                $(child).html("<ol><li>美团点评平台用户服务协议</li><li>大众点评网点评头条平台管理规范</li><li>美团外卖平台成人用品管理规范</li><li>美团外卖平台视频内容管理规范</li><li>严重违法行为平台服务停止规范</li></ol>")
                $(child1).children().eq(0).css("backgroundColor", "#F7F7F7")
            } else if (content == "小电影") {
                location.href = "http://ntlias-stu.boxuegu.com/#/login"
            }


        })

    }



})