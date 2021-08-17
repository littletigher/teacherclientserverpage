var express = require("express");
var router=express.Router();
var model = require("../modules/model")
// import model from "../modules/model"
// import express from "express";



router.post("/submitdata",function (req,res,next) {             //教师添加写作和学生的相关信息的函数
    // var teacherno=document.getElementById("teacherno").value
    console.log(req.body)
    var data={
        textno:req.body.textno,
        teacherno:req.body.teacherno,
        groupno:req.body.groupno,
        description:req.body.description
    }
    var successflag=0;                      //用于检验数据是否插入成功
    var authors=[];                         //用于记录小组中的成员
    var contributions=[];
    model.connect(function (db) {   //模型连接数据库

        /*这部分代码主要是为了把小组的信息保存进dataarrays完成dataarrays的初始化*/

        db.collection("buptgroup").find({groupid: parseInt(data.groupno)}).toArray(function(err,ret) {
            if(err){
                console.log("查找小组成员出错了",err)
            }else{
                console.log(ret)
                console.log("这是groupno:",data.groupno)
                ret.map(function (item,index) {
                    authors.push(item.studentno)
                    contributions.push(0)
                    console.log(authors)
                })

                //插入文章的函数
                db.collection("dataarrays").insertOne({textno:data.textno,authors:authors,contributions:contributions},function (err) {
                    if(err){
                        console.log("文章插入失败!",err)
                    }else{
                        console.log("文章插入成功!")


                        /*保存mapping的函数*/
                        db.collection("mapping").insertOne({
                            textno: data.textno,
                            groupno: data.groupno,
                            teacherno: data.teacherno
                        }, function (err, ret) {
                            if (err) {
                                console.log("插入失败！",err)
                            } else {
                                console.log("插入成功！")
                                successflag = 1;


                                /*保存文章的函数*/
                                db.collection("article").insertOne({textno:data.textno,description:data.description,content:" ",teacherno:data.teacherno,groupno:data.groupno},function (err,ret) {
                                    if(err){
                                        console.log("文章插入失败！",err)
                                    }else{
                                        console.log("文章插入成功！")
                                    }
                                })
                            }
                        })

                    }
                })
                if(1 ){
                    res.redirect("/createarticle/createarticle?title="+data.textno+"&teacherno="+data.teacherno);
                }
            }
        })
    })



    /*跳转到相应的页面*/

})


module.exports=router;
// export default router;






































































































































