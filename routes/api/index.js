var express = require('express');
var router = express.Router();
var userRouter = require('./users');

router.get('/users' , userRouter);

module.exports = router;