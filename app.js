// 引入express框架
const express = require('express')
// 引入path模块
const path = require('path')
// 引入session模块
var session = require('express-session')
// 引入body-parse模块
const bodyParser = require('body-parser');
// 引入数据库模块
const mongoose = require('mongoose')

//全局设置
mongoose.set('useFindAndModify', false)
// 数据库连接
mongoose.connect('mongodb://localhost/xcooo', { useNewUrlParser: true, useUnifiedTopology: true })
    // 连接成功
    .then(() => console.log('数据库连接成功'))
    // 连接失败
    .catch(err => console.log(err, '数据库连接失败'))

// 设定集合规则
const DzdpSchema = new mongoose.Schema({
    name: {
        type: String,
        // unique:true //字段是否唯一
    },
    password:{
        type:String,
        // set(val){
        //     // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
        //     return require('bcryptjs').hashSync(val,10)
        // }
    } 
  });

// 创建集合并应用规则
const Dzdp = mongoose.model('Dzdp', DzdpSchema);  // dzdps

// 导出 Dzdp模块
module.exports = Dzdp

// 创建网站服务器
const app = express()

// 设置跨域访问  需要写在最上面
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });


// 启用 session 中间件
app.use(session({
    secret: 'keyboard cat', // 相当于是一个加密密钥，值可以是任意字符串
    resave: false, // 强制session保存到session store中
    saveUninitialized: false // 强制没有“初始化”的session保存到storage中
    }))

// 实现静态资源访问功能
app.use(express.static(path.join(__dirname, 'public')))

// 配置body-parse模块
const body = app.use(bodyParser.urlencoded({ extended: true }));

// 路由分发处理
const reg = require('./route/reg')  // 注册
const login = require('./route/login') // 登录
const updatePassword = require('./route/updatePassword') // 修改密码
const updateName = require('./route/updateName') // 修改昵称

app.use('/user', reg)
app.use('/user', login)
app.use('/user',updatePassword)
app.use('/user',updateName)

// 监听端口
app.listen(5000, () => {
    console.log('大众点评服务器开启成功');
})