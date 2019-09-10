var mongoose = require('mongoose');
 
var articleSchema = new mongoose.Schema({
   title :{
       type : String,
       required : true
   },
   about : String,
   description : String,
   tags : String,
})
 
 
module.exports = mongoose.model("Articles" , articleSchema);
