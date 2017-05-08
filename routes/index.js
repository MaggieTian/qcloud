'use strict';

// const express = require('express');
// const router = express.Router();
// var mongoose = require('mongoose');
// var sd = require('silly-datetime');
// var ObjectID = require('mongodb').ObjectID;
// var comment=require("../model/comment_model");
// var deptModel=require("../model/dept_model");
// var docModel=require("../model/doctor_model");
// var orderModel=require("../model/order_model");
// var userModel=require("../model/user_model");
// var resData="";

var express = require('express');
var mongoose = require('mongoose');
var sd = require('silly-datetime');
var ObjectID = require('mongodb').ObjectID;
var comment=require("../model/comment_model");
var deptModel=require("../model/dept_model");
var docModel=require("../model/doctor_model");
var orderModel=require("../model/order_model");
var userModel=require("../model/user_model");
var cos=require("../cos-nodejs-sdk/sdk/cos");
var config=require("../cos-nodejs-sdk/sdk/config");
var crypto = require('crypto');
var querString=require('querystring');
var rq=require("request");
var http=require("https");
var resData="";

//test index
router.get('/', require('./welcome'));
router.get('/user', require('./user'));
router.all('/tunnel', require('./tunnel'));

// //find comment record by page size
// router.get('/index', function(req,res){
//
//     console.log("i am in the index page");
//     mongoose.connect("mongodb://localhost/hospital");
//     var db=mongoose.connection;
//     var cnt=req.query.size;
//
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function() {
//         console.log("db  connection success!");
//     };
//
//     var query=comment.find({});
//     var size=(parseInt(cnt)-1)*5;
//     query.limit(5).skip(size);
//     query.exec(function (error,comment) {
//
//         if (error){
//             console.log("there are some error:"+error);
//             return "error!"
//         }
//         else{
//             resData=JSON.stringify(comment);
//             db.close();
//             res.send(resData);
//             cnt+=50;
//         }
//     });
//
//
//
// });
//
// //find all dept of hospital
// router.get('/dept',function (req,res) {
//     mongoose.connect("mongodb://localhost/hospital");
//     var db=mongoose.connection;
//
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function() {
//         console.log("db  connection success!");
//     });
//     deptModel.find({},function (err,dept) {
//         if(!err){
//             var data=JSON.stringify(dept);
//             console.log("***"+dept);
//             res.send(data);
//             db.close();
//         }
//
//     })
//
// });
//
// //find the top 6 dept/doctor by the total num of comments
// router.get('/result',function(req,res){
//
//     mongoose.connect("mongodb://localhost/hospital");
//     var db=mongoose.connection;
//
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function() {
//         console.log("db  connection success!");
//     });
//     var query=comment.aggregate([{$group : {_id : "$doctor", num: {$sum : 1}}}]);
//     query.sort({"num":-1});
//     query.limit(6);
//     query.exec(function (error,comment) {
//         if(!error){
//             var resdata=JSON.stringify(comment);
//             console.log(resdata);
//             res.send(resdata);
//             db.close();
//         }
//
//     })
//
// });
//
// //find all doctors group by dept
// router.get('/findDotorBydept',function (req,res) {
//
//     mongoose.connect("mongodb://localhost/hospital");
//     var db=mongoose.connection;
//     var dept=req.query.dept;
//     console.log(dept);
//
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function() {
//         console.log("db  connection success!");
//     });
//     docModel.find({"docType":dept},function (err,doctor) {
//
//         console.log(doctor);
//         res.send(JSON.stringify(doctor));
//         db.close();
//
//     })
// });
// //add the order info
// router.post('/addOrder',function (req,res) {
//     mongoose.connect("mongodb://localhost/hospital");
//     var db = mongoose.connection;
//     console.log(req.body);
//
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function () {
//         console.log("db  connection success!");
//     });
//     var curTime=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
//     var order = new orderModel({
//         name: req.body.name,
//         bill: req.body.bill,
//         cardNum: req.body.card,
//         dept: req.body.dept,
//         location: req.body.location,
//         time: req.body.time,
//         orderTime:curTime,
//         payStatus: 0
//     });
//     order.save(function (err) {
//
//         if (!err) {
//             console.log(order.id);
//             res.send(JSON.stringify(order.id));
//
//             db.close();
//
//
//         }
//         else {
//             res.send('fail');
//
//         }
//
//     });
//
// });
//
// //    updata the payment status with id
// router.post("/upadetPayment",function (req,res) {
//
//     mongoose.connect("mongodb://localhost/hospital");
//     var db = mongoose.connection;
//     var id=req.body.id;
//     console.log(id);
//
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function () {
//         console.log("db  connection success!");
//     });
//     orderModel.findOne({_id:ObjectID(id)}, function (err,doc) {
//         if(!err){
//             doc.payStatus=1;
//             doc.save(function (err) {
//
//                 if (!err) {
//                     res.send('success');
//
//                     db.close();
//
//
//                 }
//                 else {
//                     res.send('fail');
//
//                 }
//
//             });
//
//         }
//         else{
//             res.send("fail");
//         }
//
//     })
// });
//
// router.post("/register",function (req,res) {
//     mongoose.connect("mongodb://localhost/hospital");
//     var db=mongoose.connection;
//
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function() {
//         console.log("db  connection success!");
//     });
//     var curTime=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
// 	var user=new userModel({
//         name:req.body.name,
//         idcard:req.body.idcard,
//         pwd:req.body.pwd,
//         phone:req.body.phone,
//         email:req.body.email,
//         age:req.body.age,
//         gender:req.body.gender,
//         date:curTime,//the date of register
//         reminder:[{
//             reminderTime:"",
//             content:""
//         }],
//         photo:"http://img.guahao.cn/img/character/doc-unknow-l.png?_=20121223",
//         disease:[{
//             time:curTime,
//             dept:"",
//             result:"",
// 			area:req.body.area
//
//         }]
// 	});
// 	user.save(function (err) {
// 		if(!err){
// 			res.send("success");
//
// 		}
// 		else{
// 			res.send("fail");
// 		}
//
//     });
// 	db.close();
// });
// //use telphone or idcard login in page
// router.post('/login',function (req,res) {
//
//
//     mongoose.connect("mongodb://localhost/hospital");
//     var db=mongoose.connection;
//
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function() {
//         console.log("db  connection success!");
//     });
//     var name=req.body.name;
//     var pwd=req.body.pwd;
//
//     userModel.find({"phone":name,"pwd":pwd},function (err,doc) {
//         if(!err){
//             console.log(doc);
//             res.json(doc);
//             db.close();
//
//         }
//         else{
//             res.send("error");
//         }
//
//     });
//
//
// });
//
// //查询用户默认显示的前九张报告单
// router.post("/viewReport",function (req,res) {
//
//     var idCard=req.body.id;
//     // var name=req.query.name;
//     var cnt=1;
//
//     var resData=[];
//     var params = {
//         Bucket :'tq670',    /* 必须 */
//         Region : 'cn-north',    /* 必须 */
//         Prefix:'check/'+idCard
//     };
//     var url="https://tq670-1253538219.file.myqcloud.com/";
//
//     cos.getBucket(params, function(err, data) {
//         if(err) {
//             console.log("error"+err);
//         } else {
//             for(var i=1;i<data.Contents.length;i++){
//                 if(cnt==9){
//                     break;
//                 }
//                 else {
//
//                     var item={};
//                     item.name = data.Contents[i].Key.split('/')[2];
//                     item.fileUrl = url + data.Contents[i].Key;
//                     resData.push(item);
//                     cnt++;
//                 }
//             }
//             res.json(resData);
//         }
//     });
// });
//
// //查找检查报告
// router.post("/searchReport",function (req,res) {
//
//     var idCard=req.body.id;
//     var file=req.body.file;
//     var cnt=1;
//
//     var resData=[];
//     var params = {
//         Bucket :'tq670',    /* 必须 */
//         Region : 'cn-north',    /* 必须 */
//         Prefix:'check/'+idCard+'/'+file
//         // Prefix:'check/10132130207_田琪/检验报告模版2'
//     };
//     var url="https://tq670-1253538219.file.myqcloud.com/";
//
//     cos.getBucket(params, function(err, data) {
//         if(err) {
//             console.log("error"+err);
//         } else {
//             for(var i=0;i<data.Contents.length;i++){
//                 var item={};
//                 item.name = data.Contents[i].Key.split('/')[2];
//                 item.fileUrl = url + data.Contents[i].Key;
//                 resData.push(item);
//             }
//             console.log(resData);
//             res.json(resData);
//         }
//     });
// });
//
//
// router.get("/hello",function (req,res) {
//     res.send("hello world!");
//
// });
//
// router.get('/sendMessage',function (req,res) {
//
//
// });
//find comment record by page size
router.get('/index', function (req, res, next) {

    console.log("i am in the index page");
    mongoose.connect("mongodb://localhost/hospital");
    var db=mongoose.connection;
    var cnt=req.query.size;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("db  connection success!");
    });

    var query=comment.find({});
    var size=(parseInt(cnt)-1)*5;
    query.limit(5).skip(size);
    query.exec(function (error,comment) {

        if (error){
            console.log("there are some error:"+error);
            return "error!"
        }
        else{
            resData=JSON.stringify(comment);
            db.close();
            res.send(resData);
            cnt+=50;
        }
    });

});


//find all dept of hospital
router.get('/dept',function (req,res) {
    mongoose.connect("mongodb://localhost/hospital");
    var db=mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("db  connection success!");
    });
    deptModel.find({},function (err,dept) {
        if(!err){
            var data=JSON.stringify(dept);
            console.log("***"+dept);
            res.send(data);
            db.close();
        }

    })

});

//find the top 6 dept/doctor by the total num of comments
router.get('/result',function(req,res){

    mongoose.connect("mongodb://localhost/hospital");
    var db=mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("db  connection success!");
    });
    var query=comment.aggregate([{$group : {_id : "$doctor", num: {$sum : 1}}}]);
    query.sort({"num":-1});
    query.limit(6);
    query.exec(function (error,comment) {
        if(!error){
            var resdata=JSON.stringify(comment);
            console.log(resdata);
            res.send(resdata);
            db.close();
        }

    })

});

//find all doctors group by dept
router.get('/findDotorBydept',function (req,res) {

    mongoose.connect("mongodb://localhost/hospital");
    var db=mongoose.connection;
    var dept=req.query.dept;
    console.log(dept);

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("db  connection success!");
    });
    docModel.find({"docType":dept},function (err,doctor) {

        console.log(doctor);
        res.send(JSON.stringify(doctor));
        db.close();

    })
});
//add the order info
router.post('/addOrder',function (req,res) {
    mongoose.connect("mongodb://localhost/hospital");
    var db = mongoose.connection;
    console.log(req.body);

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("db  connection success!");
    });
    var curTime=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    var order = new orderModel({
        name: req.body.name,
        bill: req.body.bill,
        cardNum: req.body.card,
        dept: req.body.dept,
        location: req.body.location,
        time: req.body.time,
        orderTime:curTime,
        payStatus: 0
    });
    order.save(function (err) {

        if (!err) {
            console.log(order.id);
            res.send(JSON.stringify(order.id));

            db.close();


        }
        else {
            res.send('fail');

        }

    });

});

//    update the payment status with id
router.post("/upadetPayment",function (req,res) {

    mongoose.connect("mongodb://localhost/hospital");
    var db = mongoose.connection;
    var id=req.body.id;
    console.log(id);

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("db  connection success!");
    });
    orderModel.findOne({_id:ObjectID(id)}, function (err,doc) {
        if(!err){
            doc.payStatus=1;
            doc.save(function (err) {

                if (!err) {
                    res.send('success');

                    db.close();


                }
                else {
                    res.send('fail');

                }

            });

        }
        else{
            res.send("fail");
        }

    });

});

router.post("/register",function (req,res) {
    mongoose.connect("mongodb://localhost/hospital");
    var db=mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("db  connection success!");
    });
    console.log(req.body);
    var Num="";
    for(var i=0;i<10;i++)
    {
        Num+=Math.floor(Math.random()*10);
    }
    var curTime=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    var user=new userModel({
        name:req.body.name,
        idcard:req.body.idcard,
        pwd:req.body.pwd,
        phone:req.body.phone,
        email:req.body.email,
        age:req.body.age,
        gender:req.body.gender,
        cardNum:Num,
        date:curTime,//the date of register
        reminder:[{
            reminderTime:"",
            reminderDate:"",
            content:"",
            status:0
        }],
        photo:"http://img.guahao.cn/img/character/doc-unknow-l.png?_=20121223",
        disease:[{
            time:curTime,
            dept:"",
            result:"",
            area:req.body.area

        }]
    });
    user.save(function (err) {
        if(!err){
            res.send("ok");

        }
        else{
            res.send("fail");
        }

    });
    db.close();
});

//use telphone or idcard login in page
router.post('/login',function (req,res) {


    mongoose.connect("mongodb://localhost/hospital");
    var db=mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("db  connection success!");
    });
    var name=req.body.name;
    var pwd=req.body.pwd;

    userModel.find({"phone":name,"pwd":pwd},function (err,doc) {
        if(!err&&doc.length>0){
            console.log(doc);
            res.json(doc);
            db.close();

        }
        else if(err){
            res.send("error");
            db.close();
        }
        else{
            res.send("no user");
            db.close();
        }

    });


});
router.get("/getAltitude",function (req,res) {
    mongoose.connect("mongodb://localhost/hospital");
    var db=mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("db  connection success!");
    });
    console.log(req.query.dept);
    var Bydept=req.query.dept;
    var query=null;
    if(Bydept=="全部科室") {
        query=comment.aggregate([{$group: {_id: "$service", data: {$sum: 1}}}]);
        query.sort({"data":-1});
        query.exec(function (err, doc) {
            if (!err) {
                console.log(doc);
                res.json(doc);
                db.close();
            }


        });
    }
    // 根据科室查询
    else{
        db.close();

    }

});
//根据医联卡查询挂号信息
router.post("/getOrder",function (req,res) {
    mongoose.connect("mongodb://localhost/hospital");
    var db=mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("db  connection success!");
    });
    console.log(req.body.cardNum);
    var query=orderModel.find({"cardNum":req.body.cardNum});
    query.sort({"time":-1});

    query.exec(function (err,doc) {
        if(!err){
            res.json(doc);
            db.close();
        }
        else{
            console.log(err);
        }


    });


});
//添加提醒事件
router.post("/addRemind",function (req,res) {

    mongoose.connect("mongodb://localhost/hospital");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("db  connection success!");
    });
    var id=req.body.idcard;
    var time=req.body.time;
    var date=req.body.date;
    var content=req.body.content;
    userModel.findOne({idcard:id},function (err,doc) {
        if(!err){
            doc.reminder.push({
                reminderTime:time,
                reminderDate:date,
                content:content,
                status:0

            });
            doc.save(function (err) {
                if (!err) {
                    res.send('success');

                    db.close();


                }
                else {
                    res.send('fail');
                    db.close();

                }

            });
        }


    });


});

//根据身份证号码查询用户的提醒事项
router.post("/getReminder",function (req,res) {
    mongoose.connect("mongodb://localhost/hospital");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("db  connection success!");
    });
    var id=req.body.idcard;
    userModel.findOne({idcard:id},function (err,doc) {
        if(!err){
            res.json(doc.reminder);
            db.close();

        }

    })


});
//删除提醒事件
router.post("/delelteReminder",function (req,res) {
    mongoose.connect("mongodb://localhost/hospital");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("db  connection success!");
    });
    var id=req.body.idcard;
    var index=req.body.index;
    userModel.findOne({idcard:id},function (err,doc) {
        if(!err){
            doc.reminder.splice(index,1);
            doc.save(function (err) {
                if(!err){
                    res.send("success");
                    db.close();
                }

            });

        }

    })


});

//修改个人邮箱和电话号码信息
router.post("/updateInfo",function (req,res) {

    mongoose.connect("mongodb://localhost/hospital");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("db  connection success!");
    });
    var emailNum=req.body.email;
    var phoneNum=req.body.phone;
    var id=req.body.idcard;
    userModel.findOne({idcard:id}, function (err,doc) {
        if(!err){
            console.log(doc);
            doc.email=emailNum;
            doc.phone=phoneNum;
            doc.save(function (err) {

                if (!err) {
                    res.send('success');
                    db.close();


                }
                else {
                    res.send('fail');

                }

            });

        }
        else{
            res.send("fail");
            db.close();
        }

    });

});
//下载报告
router.get("/download",function(req,res){
    var params = {
        Bucket :'tq670',    /* 必须 */
        Region : 'cn-north',    /* 必须 */
        Key:"add.jpg",
        Output : '/Users/tianqi/Desktop/毕设'        /* 必须 */
    };

    cos.getObject(params, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });

});
//查询已支付账单
router.get("/payed",function (req,res) {

    mongoose.connect("mongodb://localhost/hospital");
    var db = mongoose.connection;
    console.log(req.body);

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("db  connection success!");
    });
    orderModel.find({payStatus:1},function (err,doc) {
        if(!err){
            res.json(doc);
            db.close();
        }

    })

});
//查询用户默认显示的前九张报告单
router.post("/viewReport",function (req,res) {

    var idCard=req.body.id;
    // var name=req.query.name;
    var cnt=1;

    var resData=[];
    var params = {
        Bucket :'tq670',    /* 必须 */
        Region : 'cn-north',    /* 必须 */
        Prefix:'check/'+idCard
    };
    var url="https://tq670-1253538219.file.myqcloud.com/";

    cos.getBucket(params, function(err, data) {
        if(err) {
            console.log("error"+err);
        } else {
            for(var i=1;i<data.Contents.length;i++){
                if(cnt==9){
                    break;
                }
                else {

                    var item={};
                    item.name = data.Contents[i].Key.split('/')[2];
                    item.fileUrl = url + data.Contents[i].Key;
                    resData.push(item);
                    cnt++;
                }
            }
            res.json(resData);
        }
    });
});

//查找检查报告
router.post("/searchReport",function (req,res) {

    var idCard=req.body.id;
    var file=req.body.file;
    var cnt=1;

    var resData=[];
    var params = {
        Bucket :'tq670',    /* 必须 */
        Region : 'cn-north',    /* 必须 */
        Prefix:'check/'+idCard+'/'+file
        // Prefix:'check/10132130207_田琪/检验报告模版2'
    };
    var url="https://tq670-1253538219.file.myqcloud.com/";

    cos.getBucket(params, function(err, data) {
        if(err) {
            console.log("error"+err);
        } else {
            for(var i=0;i<data.Contents.length;i++){
                var item={};
                item.name = data.Contents[i].Key.split('/')[2];
                item.fileUrl = url + data.Contents[i].Key;
                resData.push(item);
            }
            console.log(resData);
            res.json(resData);
        }
    });
});

router.get("/index",function (req,res) {
    res.send("hello world!");

});
// 发送短信验证码
router.get('/sendCode',function (req,res) {

    var mobileNum='13248226806';
    var timeStamp=Date.now();

    // appId
    var appId = 'tq57714670';
    // init PATH
    var baseURL = "https://api.wilddog.com/sms/v1/" + appId;
    var sendURL = baseURL + "/code/send";
    // 短信秘钥
    var APP_KEY = "psMPJDqqKBeXH5YZD0DcOCZh1OWvUTNKdpX4wKR0";
    // 准备数据 发送短信验证码类包括下面这些信息:templateId mobile timestamp
    var requestBody={"templateId":100000, "mobile":mobileNum,"timestamp":timeStamp};
    // 排序
    var paramStr ="mobile="+mobileNum+"&templateId=100000&timestamp="+timeStamp;
    var signStr=paramStr+'&'+router_KEY;
    //加密
    var hash=crypto.createHash('sha256');
    var sign=hash.update(signStr).digest('hex');
    requestBody.signature=sign;
    console.log(requestBody);
    rq.post({url:sendURL, form:requestBody}, function(error, response, body) {
        if (!error) {
            console.log(body);
            res.send(body);
        }
    });

});
//验证输入的验证码是否正确
router.get("/verifyCode",function (req,res) {

    var code=req.query.code;
    var mobileNum='13248226806';
    var timeStamp=Date.now();
    // appId
    var appId = 'tq57714670';
    // init PATH
    var baseURL = "https://api.wilddog.com/sms/v1/" + appId;
    var sendURL = baseURL + "/code/check";
    // 短信秘钥
    var APP_KEY = "psMPJDqqKBeXH5YZD0DcOCZh1OWvUTNKdpX4wKR0";
    // 准备数据 发送短信验证码类包括下面这些信息:templateId mobile timestamp
    var requestBody={"code":code, "mobile":mobileNum,"timestamp":timeStamp};
    // 排序
    var paramStr ="code="+code+"mobile="+mobileNum+"&timestamp="+timeStamp;
    var signStr=paramStr+'&'+APP_KEY;
    //加密
    var hash=crypto.createHash('sha256');
    var sign=hash.update(signStr).digest('hex');
    requestBody.signature=sign;
    console.log(requestBody);
    rq.post({url:sendURL, form:requestBody}, function(error, response, body) {
        if (!error) {
            console.log(body);
            res.send(body);
        }
    });
});

//    准备测试数据
router.get("/generateData",function (req,res) {
    mongoose.connect("mongodb://localhost/hospital");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("db  connection success!");
    });
    userModel.findOne({phone:"13248226806",pwd:"tian"},function (err,doc) {
        if(!err){
            console.log(doc.disease);
            for(var i=0;i<5;i++){

                doc.disease.push({
                        "time":"2017-05-03 ",
                        "dept":"皮肤科",
                        "result":"脸部皮肤过敏",
                        "area":"虹口区"
                    }

                );
                doc.save(function (err) {
                    if(!err){
                        res.send("finnish");

                    }
                    db.close();


                })
            }


        }


    });


});





module.exports = router;
