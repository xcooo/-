// 引入express框架
const express = require('express');
// 引入大众点评数据库用户对象
const User = require('../model/user.js')
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

    // 使用User集合查询和用户输入的用户名一致的那个信息
    let userInfo = await User.findOne({ name: username })
    

    if (userInfo) {
        //说明查找到了跟用户输入的用户名一致的信息
        //  console.log(userInfo);
        // 用户名正确的情况下，我们只需要再判断一下用户输入的密码是否正确
        if (userInfo.password === password) {
            //我们需要将用户的信息保存到session对象里面去，这样下一次访问服务器的时候才能看到信息
            req.session.userInfo = userInfo;
            //在express框架中可以通过app.locals来设置所有模板都能访问的数据
            //在request对象中可以访问到服务器app对象
            req.app.locals.userInfo = userInfo;

            //返回成功的结果 (需要返回用户名和id)
            res.status(200).send({ code: 0, message: [userInfo.name,userInfo._id]});
            // res.redirect('/xc_info.art',{ code: 0, message: [userInfo.name,userInfo._id]})
        }else {
            resData.code = 3;
            resData.message = '用户名或密码错误 !';
            return res.json(resData);
        }
    } else {
        resData.code = 3;
        resData.message = '用户名或密码错误 !';
        return res.json(resData);
    }

})

module.exports = login;