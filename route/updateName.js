// 引入express框架
const express = require('express');
// 引入大众点评数据库对象
const User = require('../app.js')
// 引入路由模块
const updateName = express.Router()

// 统一返回格式
var resData;
updateName.use(function (req, res, next) {
    resData = {
        code: 0,
        message: ''
    }
    next();
});

// 修改密码模块
updateName.post('/updateName', async (req, res, next) => {
    // 1.获取前端传输的用户数据
    const username = req.body.username
    const newUsername = req.body.newUsername

    // 2.判断账号密码是否为空
    if (!username) {
        resData.code = 1;
        resData.message = '用户名不能为空';
        return res.json(resData);
    }
    if (!newUsername) {
        resData.code = 2;
        resData.message = '新用户名不能为空';
        return res.json(resData);
    }
    if (newUsername.length < 2) {
        resData.code = 2;
        resData.message = '新用户名不能少于2位 !';
        return res.json(resData);
    }
    if (newUsername.length > 8) {
        resData.code = 2;
        resData.message = '新用户名不能多于8位 !';
        return res.json(resData);
    }
    // 3.新用户名和旧用户名不能相同
    if (username == newUsername) {
        resData.code = 4;
        resData.message = '新用户名不能和用户名相同'
        return res.json(resData);
    }

    // 4.查询数据库是否存在该用户, 检查旧用户名是否正确
    User.findOneAndUpdate({ name: username }, { name: newUsername })
        .then(userinfo => {
            if (!userinfo) {
                // 如果不存在, 返回用户名或密码不正确
                resData.code = 5;
                resData.message = '用户名或密码错误 !';
                return res.json(resData);
            }
            console.log(userinfo.name + ' 昵称修改成功');
            // 返回成功的结果
            res.status(200).send({ code: 0, message: '昵称修改成功' });
        })

})

// 导出路由
module.exports = updateName;
