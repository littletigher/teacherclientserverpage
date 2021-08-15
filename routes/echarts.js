var express=require("express")
var router=express.Router()
var model=require("../modules/model")

router.post('/',function (req,res,next) {
    var textno=req.query.textno;
    console.log(textno)
    model.connect(function (db,client) {
        db.collection('dataarrays').find({textno:textno}).toArray(function (err,ret) {
            if(err){
                console.log("dataarrays查询组成echarts失败!")
            }else{
                console.log(ret)
                if(ret!==null){

                var authors=ret[0].authors;
                console.log(authors)
                var contributions=ret[0].contributions;
                var data=[{value:0,name:"nobody"}];
                for(var i=0;i<authors.length;i++){
                    if (JSON.stringify(data).indexOf(JSON.stringify(authors[i])) === -1){
                        data.push({value:contributions[i],name:authors[i]});
                    }else{
                        console.log(data)
                        for(var t=0;t<data.length;t++){
                            if(data[t].name===authors[i]){
                                data[t].value=data[t].value + contributions[i];
                            }
                        }
                    }
                }
                console.log(data)
                res.json(data)

                }
            }
        })
    })
})

module.exports = router;