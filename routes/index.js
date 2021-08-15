var express = require("express")
var router = express.Router()
var model=require('../modules/model')
// import express from "express";

router.get('/',function (req,res,next) {
    res.render('index',{})
})

router.get('/test',function (req,res,next) {
    res.render('show',{})
})

router.get('/teacherpage',function (req,res,next) {
    var data={
        teacher:"已发布的全体文章列表:",
        list:[]
    }
    model.connect(function (db) {
        db.collection("article").find().toArray(function (err,ret) {
            if(err){
                console.log("读取文章出错了!")
            }else{
                console.log("读取文章成功!")
                data.list=ret
                data.list.map(function (item,index) {
                    console.log(item)
                })
                console.log("这是datalist"+data.list[0])
                res.render('teacher',{data:data})
            }
        })
    })

})

module.exports=router
// export default router;
