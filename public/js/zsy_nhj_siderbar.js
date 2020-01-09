// var nhj_btn = document.querySelector(".nhj_btn");
// var nhj_close = document.querySelector(".nhj_close");
// var nhj_content = document.querySelector(".nhj_content");
// // 点击弹出侧边栏
// function popup_siderbar() {
//     var nhj_content = document.querySelector(".nhj_content");
//     var nhj_btn = document.querySelector(".nhj_btn");
//     var timer = setInterval(function () {
//         if (nhj_content.offsetLeft <= 1249 && nhj_btn.offsetLeft <= 1158) {
//             // alert(1);
//             // 停止动画 本质是停止定时器
//             clearInterval(timer)
//         }
//         nhj_content.style.left = nhj_content.offsetLeft - 1.3 + 'px';
//         // nhj_content.style.left =  '1256.7px';
//         nhj_btn.style.left = nhj_btn.offsetLeft - 1.3 + 'px';
//         // nhj_btn.style.left = '1167.7px';
//     }, 5);
// }

// // 点击关闭侧边栏
// function close_siderbar() {
//     var nhj_content = document.querySelector(".nhj_content");
//     var nhj_btn = document.querySelector(".nhj_btn");
//     var timer = setInterval(function () {
//         if (nhj_content.offsetLeft >= 1517 && nhj_btn.offsetLeft >= 1429.7) {
//             // alert(1);
//             // 停止动画 本质是停止定时器
//             clearInterval(timer)
//         }
//         nhj_btn.style.left = nhj_btn.offsetLeft + 1.3 + 'px';
//         nhj_content.style.left = nhj_content.offsetLeft + 1.3 + 'px';
//     }, 5);
// }

// // 点击调用弹出侧边栏
// nhj_btn.addEventListener("click", function () {
//     popup_siderbar();
// })

// // 点击调用关闭侧边栏
// nhj_close.addEventListener("click", function () {
//     close_siderbar();
// })

$(".nhj_btn").click(function(){
    $(".nhj_content").fadeIn(2000);
    $(".nhj_btn").fadeOut(2000);
});

$(".nhj_close").click(function(){
    $(".nhj_content").fadeOut(2000);
    $(".nhj_btn").fadeIn(2500);
});
