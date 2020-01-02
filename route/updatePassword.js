// 引入express框架
const express = require('express');
// 引入大众点评数据库对象
const User = require('../app.js')
// 引入路由模块
const updatePssword = express.Router()

// 统一返回格式
var resData;
updatePssword.use(function (req, res, next) {
    resData = {
        code: 0,
        message: ''
    }
    next();
});

// 修改密码模块
updatePssword.post('/updatePssword', async (req, res, next) => {
    // 1.获取前端传输的用户数据
    const username = req.body.username
    const oldpassword = req.body.oldpassword
    const newpassword = req.body.newpassword

    // 2.判断账号密码是否为空
    if (!username) {
        resData.code = 1;
        resData.message = '用户名不能为空';
        return res.json(resData);
    }
    if (!oldpassword) {
        resData.code = 2;
        resData.message = '旧密码不能为空';
        return res.json(resData);
    }
    if (oldpassword.length < 6) {
        resData.code = 2;
        resData.message = '密码不能少于6位 !';
        return res.json(resData);
    }
    if (!newpassword) {
        resData.code = 3;
        resData.message = '新密码不能为空';
        return res.json(resData);
    }

    // 3.原密码和新密码不能相同
    if (oldpassword == newpassword) {
        resData.code = 4;
        resData.message = '新密码不能和原密码相同'
        return res.json(resData);
    }

    // 4.查询数据库是否存在该用户, 检查原密码是否正确
    User.findOneAndUpdate({ name: username, password: oldpassword }, { password: newpassword })
        .then(userinfo => {
            if (!userinfo) {
                // 如果不存在, 返回用户名或密码不正确
                resData.code = 5;
                resData.message = '用户名或密码错误 !';
                return res.json(resData);
            }
            console.log(userinfo.name + ' 密码修改成功');
            // 返回成功的结果
            res.status(200).send({ code: 0, message: '密码修改成功' });
        })

})

// 导出路由
module.exports = updatePssword;
