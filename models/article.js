var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 

///article schema
var articleSchema = new Schema({
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
   },
   userId :{
       type : Schema.Types.ObjectId,
    //    required : true,
       ref : "User"
   }
})
 
 
module.exports = mongoose.model("Article" , articleSchema);
