var mongoose = require('mongoose');
 

///article schema
var articleSchema = new mongoose.Schema({
   title :{
       type : String,
       required : true
   },
   about : {
       type : String,
       required : true
   },
   description : String,
   tags : String,
   commentId : []
})
 
 
module.exports = mongoose.model("Articles" , articleSchema);
