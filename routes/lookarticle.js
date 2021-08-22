var express = require("express")
var router = express.Router()
var model=require("../modules/model")



router.get('/showarticle',function (req,res,next) {
    console.log("已经进来了")
    var data={
        textno:"",
        description:"",
        content:"",
        contentofone:"",
        contentoftwo:"",
        contentofthree:""
    }
    data.textno=req.query.thetitle;
    model.connect(function (db) {
        db.collection("article").find({textno:data.textno}).toArray(function (err,ret) {
            if(err){
                console.log("查找文章失败！")
            }else{
                console.log("查找展示文章成功！")
                data=ret[0]
                console.log(ret)
                console.log(data)
                db.collection("articlethreepartern").find({textno:data.textno,partern:"1"}).toArray(function (err,ret) {
                    if(err){
                        console.log("查找一稿出错了!");
                    }else{
                        var contents=ret[0].content;
                        if(contents==" "){
                            contents="一稿尚未提交请耐心等候。"
                        }
                        data.contentofone=contents;
                    }
                })
                db.collection("articlethreepartern").find({textno:data.textno,partern:"2"}).toArray(function (err,ret) {
                    if(err){
                        console.log("查找二稿出错了!");
                    }else{
                        var contents=ret[0].content;
                        if(contents==" "){
                            contents="二稿尚未提交请耐心等候。"
                        }
                        data.contentoftwo=contents;
                    }
                })
                db.collection("articlethreepartern").find({textno:data.textno,partern:"3"}).toArray(function (err,ret) {
                    if(err){
                        console.log("查找三稿出错了!");
                    }else{
                        var contents=ret[0].content;
                        if(contents==" "){
                            contents="三稿尚未提交请耐心等候。"
                        }
                        data.contentofthree=contents;
                        res.render("checkarticle",{data:data})
                    }
                })
            }
        })




    })

})

module.exports=router