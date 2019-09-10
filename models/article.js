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
   tags : {
       type : [Schema.Types.ObjectId],
       ref : 'Tag',
   },
   commentId : {
       type : [Schema.Types.ObjectId],
       ref : 'Comment'
   }
})
 
 
module.exports = mongoose.model("Articles" , articleSchema);
