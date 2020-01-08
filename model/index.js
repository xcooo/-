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