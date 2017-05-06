/**
 * Created by tianqi on 2017/4/22.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var medcineSchema = new Schema({
    idcard:String,
    cardNum:String,
    medcine:[
        {
            name:String,
            price:Number,
            num:Number,
            total:Number
        }
    ],
    time:String,
    address:[

    ],
    type:String
},{collection:"medcine"});

module.exports=mongoose.model("orders",medcineSchema);
