// 获取元素
var prize_btn = document.querySelector("#prize_btn");
var prize = document.querySelector(".htmleaf-container");
var bg = document.querySelector("#bg");
var back_down=document.querySelector("#back_down");
// 添加事件
// 点击显示抽奖
prize_btn.addEventListener("click", function() {
		back_down.style.display = "block";
		prize.style.display = "block";
		bg.style.display = "block"
})
// 点击退下关闭抽奖
back_down.addEventListener("click",function  () {
		back_down.style.display = "none";
		prize.style.display = "none";
		bg.style.display = "none"
})
