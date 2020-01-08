// 引入express框架
const express = require('express');
// 引入大众点评数据库商品对象
const User = require('../model/goods.js')
// 引入路由模块
const car = express.Router()

// 统一返回格式
var resData;
car.use(function (req, res, next) {
    resData = {
        code: 0,
        message: ''
    }
    next();
});

// 页面请求
car.get('/add',(req, res) => {
    res.render('123')
})

// 添加购物车模块
car.post('/add', async (req, res, next) => {
  res.send('123')
})

module.exports = car;