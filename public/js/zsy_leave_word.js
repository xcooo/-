 // 1. 获取元素
 var btn = document.querySelector('button');
 var text = document.querySelector('textarea');
 var leava_word_ul = document.querySelector('.leava_word_ul');
 // 2. 注册事件
 btn.onclick = function () {

     if (text.value == '') {
         alert('您没有输入内容');
         return false;
     } else {
         // console.log(text.value);
         // (1) 创建元素
         var li = document.createElement('li');
         // 先有li 才能赋值
         li.innerHTML = text.value;
         // (2) 添加元素
         // ul.appendChild(li);
         leava_word_ul.insertBefore(li, leava_word_ul.children[0]);
         text.value = "";
     }
 }