var express=require("express")
var router=express.Router()
var model=require("../modules/model")

router.post('/',function (req,res,next) {
    var textno=req.query.textno;
    console.log(textno)
    var answerdata=[];
    model.connect(function (db,client) {
        db.collection('dataarrays').find({textno:textno}).toArray(function (err,ret) {
            if(err){
                console.log("dataarrays查询组成echarts失败!")
            }else{
                console.log(ret)
                if(ret!==null){
                    for(var i=0;i<ret[0].authors.length;i++){
                        answerdata.push({value:ret[0].contributions[i],name:ret[0].authors[i]})
                    }
                }
                console.log(answerdata)
                res.json(answerdata)
            }
        })
    })
})

module.exports = router;