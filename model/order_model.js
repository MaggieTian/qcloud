/**
 * Created by tianqi on 2017/3/29.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    name:String,
    cardNum:String,
    dept:String,
    location:String,
    bill:String,
    time:String,
    payStatus:Number,
    orderTime:String,
},{collection:"order"});

module.exports=mongoose.model("orders",orderSchema);