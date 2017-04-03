'use strict';

const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

router.get('/', require('./welcome'));
router.get('/login', function(req,res){
		mongoose.connect("mongodb://localhost/hospital");
        var db=mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log("db  connection success!");
            res.send("hello maggie!");
        });
}
);
router.get('/user', require('./user'));
router.all('/tunnel', require('./tunnel'));

module.exports = router;
