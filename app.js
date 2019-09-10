//require express

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//require dotenv

require('dotenv').config();
//require mongoose

var mongoose = require('mongoose');

//connect mongoose

mongoose.connect('mongodb://localhost/conduit' , {useNewUrlParser : true} , 
    err => err ? console.log(err) : console.log('connected to dbs')
)

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
