/**
 * Created by tianqi on 2017/4/3.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,
    idcard:String,
    pwd:String,
    phone:String,
    email:String,
    age:Number,
    gender:String,
    date:String,//the date of register
    cardNum:String,
    reminder:[{
        reminderTime:String,
        reminderDate:String,
        content:String,
        status:Number
    }],
    photo:String,
    disease:[{
        time:String,
        dept:String,
        result:String,
        area:String

    }]

},{collection:"user"});

module.exports=mongoose.model("user",userSchema);