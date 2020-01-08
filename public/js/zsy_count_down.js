// window.onload = function count_down(params) {
    // 目标时间的时间戳
    var endDate = new Date('2020-1-17 21:30:0');
    var end = endDate.getTime();

    // 获取天时分秒的盒子
    var spanDay = $('#day');
    var spanHour = $('#hour');
    var spanMinute = $('#minute');
    var spanSecond = $('#second');

    // 开启定时器
    setInterval(countdown, 1000);

    countdown();
    // 倒计时
    function countdown() {
        // 当前时间的时间戳
        var nowDate = new Date();
        var now = nowDate.getTime();

        // 计算时间差（毫秒）
        var leftTime = end - now;
        // 相差的秒数
        leftTime /= 1000;

        // 求 相差的天数/小时数/分钟数/秒数
        var day, hour, minute, second;

        day = Math.floor(leftTime / 60 / 60 / 24);
        hour = Math.floor(leftTime / 60 / 60 % 24);
        minute = Math.floor(leftTime / 60 % 60);
        second = Math.floor(leftTime % 60);

        // 设置盒子的内容
        spanDay.text(day);
        spanHour.text(hour);
        spanMinute.text(minute);
        spanSecond.text(second);
    }
// }