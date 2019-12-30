// 引入express框架
const express = require('express');
// 引入大众点评数据库对象
const User = require('../app.js')
// 引入路由模块
const login = express.Router()

// 统一返回格式
var resData;
login.use(function (req, res, next) {
    resData = {
        code: 0,
        message: ''
    }
    next();
});

// 登录模块
login.post('/login', async (req, res, next) => {
    // 1.获取前端传输的用户数据
    const username = req.body.username
    const password = req.body.password
    
    // 2.判断账号密码是否为空
    if (!username || !password) {
        resData.code = 1;
        resData.message = '用户名或密码不能为空';
        return res.json(resData);
    }
    if (password.length < 6) {
        resData.code = 2;
        resData.message = '密码不能少于6位 !';
        return res.json(resData);
    }

    // 3. 查询数据库是否存在相同的用户名
    User.findOne({ name: username, password: password })
        .then(userinfo => {
            // 如果存在,说明数据库有这条记录
            // console.log(userinfo);
            if (!userinfo) {
                resData.code = 3;
                resData.message = '用户名或密码错误 !';
                return res.json(resData);
            }
            // 返回成功的结果 (需要返回用户名)
            res.status(200).send({ code: 0, message: userinfo.name });
        })
})

module.exports = login;