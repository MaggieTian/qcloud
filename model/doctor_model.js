/**
 * Created by tianqi on 2017/3/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var docSchema = new Schema({
    docName:String,
    docTitle:String,
    docDec:String,
    docScore:String,
    docImage:String,
    docType:String
},{collection:"doctor"});

module.exports=mongoose.model("doctors",docSchema);
