'use strict';

const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var sd = require('silly-datetime');
var ObjectID = require('mongodb').ObjectID;
var comment=require("../model/comment_model");
var deptModel=require("../model/dept_model");
var docModel=require("../model/doctor_model")
var orderModel=require("../model/order_model")
var resData="";

//test index
router.get('/', require('./welcome'));
router.get('/user', require('./user'));
router.get('/login', require('./login'));
router.all('/tunnel', require('./tunnel'));

//find comment record by page size
router.get('/index', function(req,res){

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

//    updata the payment status with id
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

    })
});
router.get("/hello",function (req,res) {
    res.send("hello world!");

});

router.get('/sendMessage',function (req,res) {


});




module.exports = router;
