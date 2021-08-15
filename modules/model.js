var Mongo=require("mongodb").MongoClient
var url="mongodb://localhost:27017"
var dbName="finally"
// import Mongodb from "mongodb";
// var Mongo = Mongodb.MongoClient;


function connect(callback) {
    Mongo.connect(url,function (err,client) {
        if(err){
            console.log("连接出现错误",err)
        }else{
            var db=client.db(dbName)
            console.log("连接成功")
            callback && callback(db,client)

        }
    })
}


module.exports= {
    connect
}
// export default connect;