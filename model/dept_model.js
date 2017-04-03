/**
 * Created by tianqi on 2017/3/22.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deptSchema = new Schema({
    type:String,
    name:String
},{collection:"dept"});

module.exports=mongoose.model("dept",deptSchema);