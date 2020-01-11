// 引入express框架
const express = require('express')
// 引入path模块
const path = require('path')
// 引入session模块
var session = require('express-session')
// 引入body-parse模块
const bodyParser = require('body-parser');
// 导入art-tempate模板引擎
const template = require('art-template');


// 引入数据库连接
require('./model/index.js')
// 引入大众点评数据库用户对象
const User = require('./model/user.js')

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
    saveUninitialized: false, // 强制没有“初始化”的session保存到storage中
    cookie: {
		maxAge: 24 * 60 * 60 * 1000
	}
}))

// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));


// 实现静态资源访问功能
app.use(express.static(path.join(__dirname, 'public')))

// 配置body-parse模块
app.use(bodyParser.urlencoded({ extended: true }));

// 路由分发处理
const reg = require('./route/reg')  // 注册
const login = require('./route/login') // 登录
const updatePassword = require('./route/updatePassword') // 修改密码
const updateName = require('./route/updateName') // 修改昵称

// 用户路由
app.use('/user', reg)
app.use('/user', login)
app.use('/user', updatePassword)
app.use('/user', updateName)

// 其他路由
app.get("/",(req,res)=>{
    res.render('index.art')
})
app.get("/index",(req,res)=>{
    res.render('index.art')
})

app.get("/lhj_list",(req,res)=>{
    res.render("lhj_list.art")
})
app.get("/lml_category",(req,res)=>{
    res.render("lml_category.art")
})

app.get("/lml_hotel",(req,res)=>{
    res.render("lml_hotel.art")
})

app.get("/lml_hun",(req,res)=>{
    res.render("lml_hun.art")
})

app.get("/wxm_chazhao",(req,res)=>{
    res.render("wxm_chazhao.art")
})

app.get("/wxm_list",(req,res)=>{
    res.render("wxm_list.art")
})

app.get("/xc_cart",(req,res)=>{
    res.render("xc_cart.art")
})

app.get("/xc_control",(req,res)=>{
    res.render("xc_control.art")
})

app.get("/xc_info",(req,res)=>{
    res.render("xc_info.art")
})

app.get("/xc_list",(req,res)=>{
    res.render("xc_list.art")
})

app.get("/xc_order",(req,res)=>{
    res.render("xc_order.art")
})

app.get("/zsy_lbtg",(req,res)=>{
    res.render("zsy_lbtg.art")
})

app.get("/zsy_list",(req,res)=>{
    res.render("zsy_list.art")
})

app.get("/zsy_sell",(req,res)=>{
    res.render("zsy_sell.art")
})

app.get("/zsy_vr",(req,res)=>{
    res.render("zsy_vr.art")
})

app.get("/zsy_yj",(req,res)=>{
    res.render("zsy_yj.art")
})

app.get("/zz_list",(req,res)=>{
    res.render("zz_list.art")
})

app.get("/zz-list2",(req,res)=>{
    res.render("zz-list2.art")
})

app.get("/lhj_mixi",(req,res)=>{
    res.render("lhj_mixi.art")
})

app.get("/ml_index",(req,res)=>{
    res.render("ml_index.art")
})
// 监听端口
app.listen(5000, () => {
    console.log('大众点评服务器开启成功');
})