var express = require('express');
var router = express.Router();
var userRouter = require('./users');
var articleRouter = require('./article');
var commentRouter = require('./comment');

router.use('/users' , userRouter);

router.use('/articles' , articleRouter);

router.use('/comments' , commentRouter);

module.exports = router;