// 引入数据库模块
const mongoose = require('mongoose')
// 设定用户集合规则
const DzdpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
		minlength: 2,
		maxlength: 8
    },
    password: {
        type: String,
    },
    "cartList":[ // 购物车列表
        {
            "productId": String,  // 商品Id
            "productName": String, // 商品名称
            "salePrice":String, // 商品价格
            "productImage":String, // 图片地址
            "checked":String, // 是否选中
            "productNum":String // 商品数量
        }
    ]
});

// 创建集合并应用规则
const Dzdp = mongoose.model('Dzdp', DzdpSchema);  // dzdps

// 导出 Dzdp模块
module.exports = Dzdp