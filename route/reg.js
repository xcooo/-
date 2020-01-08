// 引入express框架
const express = require('express');
// 引入大众点评数据库用户对象
const User = require('../model/user.js')
// 引入路由模块
const reg = express.Router()

// 统一返回格式
var resData;
reg.use(function (req, res, next) {
    resData = {
        code: 0,
        message: ''
    }
    next();
});

// 注册模块
reg.post('/reg', async (req, res, next) => {
    // 1.获取前端传输的用户数据
    const username = req.body.username
    const password = req.body.password

    // 2.判断账号密码是否为空
    if (!username) {
        resData.code = 1;
        resData.message = '用户名不能为空';
        return res.json(resData);
    }
    if (!password) {
        resData.code = 2;
        resData.message = '密码不能为空';
        return res.json(resData);
    }

    if (username.trim() === '' || password.trim() === '') {
        resData.code = 3;
        resData.message = '用户名或密码不能为空';
        return res.json(resData);
    }

    // 3. 查询数据库是否存在相同的用户名
    await User.findOne({ name: username })
        .then(userinfo => {
            // 如果存在, 说明数据库有这条记录
            // console.log(userinfo);
            if (userinfo) {
                resData.code = 4;
                resData.message = '用户名已经被注册 !';
                return res.json(resData);
            }
        })

    // 保存用户的信息到数据库中
    await  User.create({ name: username, password: password })
        .then(doc => console.log(doc.name + ' 注册成功'))
        .catch(err => console.log(err))
    // 返回成功的结果
    res.status(200).send({ code: 0, message: '注册成功' });
})

module.exports = reg;