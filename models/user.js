var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
///Schema
var userSchema = new mongoose.Schema({
   username : {
       type : String,
       required : true,
   },
   email : {
       type : String,
       required : true,
       unique : true
   },
   password : {
       type : String,
       required : true,
   },
   profilePicture : String,
   bio : String,
   followers : []
})
 
