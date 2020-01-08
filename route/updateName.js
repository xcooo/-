// 引入express框架
const express = require('express');
// 引入大众点评数据库用户对象
const User = require('../model/user.js')
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
    const id = req.body.id

    // 2.判断账号密码是否为空
    if (!username) {
        resData.code = 1;
        resData.message = '用户名不能为空 !';
        return res.json(resData);
    }
    if (!newUsername) {
        resData.code = 2;
        resData.message = '新用户名不能为空 !';
        return res.json(resData);
    }
    if (newUsername.length < 2) {
        resData.code = 3;
        resData.message = '用户名不能少于2位 !';
        return res.json(resData);
    }
    if (newUsername.length > 8) {
        resData.code = 4;
        resData.message = '用户名不能多于8位 !';
        return res.json(resData);
    }
    // 3.新用户名和旧用户名不能相同
    if (username == newUsername) {
        resData.code = 5;
        resData.message = '新用户名不能和用户名相同 !'
        return res.json(resData);
    }

    // 4.判断用户名是否为中文
    var reg = /^[\u4e00-\u9fa5]{2,8}$/;
    if (!reg.test(newUsername)) {
        resData.code = 6;
        resData.message = '用户名只能是中文 !'
        return res.json(resData);
    }

    // 5.使用id查询用户是否存在
    let userinfo = await User.findOne({ _id:id })
    
    // 说明不存在该用户  则不能改名
    if (!userinfo) {
        resData.code = 7;
        resData.message = '用户不存在 !'
        return res.json(resData);
    }

    // 6.使用 新用户名  查询数据库是否存在该用户名, 如果存在, 返回用户名已存在
    let usernames = await User.findOne({name:newUsername }) 
    // 说明已存在该用户名  则不能改名
    if (usernames) {
        resData.code = 8;
        resData.message = '用户名已存在 !'
        return res.json(resData);
    }

    // 7.修改用户名
    await User.update({_id:id},{name:newUsername})

    // 8.再根据id查询 修改成功后的用户名
    let user= await User.findOne({ _id:id })

    // 9.返回成功的结果  修改过的用户名和id
    res.status(200).send({ code: 0, message:[user.name,user.id] });
})

// 导出路由
module.exports = updateName;
