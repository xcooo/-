// 引入数据库模块
const mongoose = require('mongoose')
// 引入用户对象
const DzdpSchema = require('./user')

// 设定商品集合规则
const GoodsSchema = new mongoose.Schema({
    "productId": String,  // 商品Id
    "productName": String, // 商品名称
    "salePrice": String, // 商品价格
    "productImage": String, // 图片地址
    "checked": String, // 是否选中
    "productNum": String,// 商品数量
    // 使用ID将商品集合和用户集合进行关联
    user: { type : mongoose.Schema.Types.ObjectId, ref:'Dzdp'}
})

// 创建集合并应用规则
const Goods = mongoose.model('goods', GoodsSchema);  // goods

// 导出 Goods 模块
module.exports = Goods