'use strict';

const express = require('express');
const router = express.Router();

router.get('/', require('./welcome'));
router.get('/login', function(req,res){
		res.send("hello maggie tian!");
}
);
router.get('/user', require('./user'));
router.all('/tunnel', require('./tunnel'));

module.exports = router;
