const express = require("express");

const router = express.Router();

router.get("/",(req,res)=>{
    res.render("dzdp/index.art")
})

router.get("/lhj_list",(req,res)=>{
    res.render("dzdp/lhj_list.art")
})

router.get("/lml_category",(req,res)=>{
    res.render("dzdp/lml_category.art")
})

router.get("/lml_hotel",(req,res)=>{
    res.render("dzdp/lml_hotel.art")
})

router.get("/lml_hun",(req,res)=>{
    res.render("dzdp/lml_hun.art")
})

router.get("/wxm_chazhao",(req,res)=>{
    res.render("dzdp/wxm_chazhao.art")
})

router.get("/wxm_list",(req,res)=>{
    res.render("dzdp/wxm_list.art")
})

router.get("/xc_cart",(req,res)=>{
    res.render("dzdp/xc_cart.art")
})

router.get("/xc_control",(req,res)=>{
    res.render("dzdp/xc_control.art")
})

router.get("/xc_info",(req,res)=>{
    res.render("dzdp/xc_info.art")
})

router.get("/xc_info",(req,res)=>{
    res.render("dzdp/xc_info.art")
})

router.get("/xc_list",(req,res)=>{
    res.render("dzdp/xc_list.art")
})

router.get("/xc_order",(req,res)=>{
    res.render("dzdp/xc_order.art")
})

router.get("/zsy_lbtg",(req,res)=>{
    res.render("dzdp/zsy_lbtg.art")
})

router.get("/zsy_list",(req,res)=>{
    res.render("dzdp/zsy_list.art")
})

router.get("/zsy_sell",(req,res)=>{
    res.render("dzdp/zsy_sell.art")
})

router.get("/zsy_vr",(req,res)=>{
    res.render("dzdp/zsy_vr.art")
})

router.get("/zsy_yj",(req,res)=>{
    res.render("dzdp/zsy_yj.art")
})

router.get("/zz_list",(req,res)=>{
    res.render("dzdp/zz_list.art")
})

router.get("/zz-list2",(req,res)=>{
    res.render("dzdp/zz-list2.art")
})
module.exports = router;