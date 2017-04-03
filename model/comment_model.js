/**
 * Created by tianqi on 2017/3/27.
 */
/**
 * Created by tianqi on 2017/3/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    photo:String,
    name:String,
    disease:String,
    waitTime:String,
    service:String,
    doctor:String,
    time:String,
    content:String
},{collection:"comment"});

module.exports=mongoose.model("comments",commentSchema);