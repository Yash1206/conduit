var mongoose = require("mongoose");

///Comment Schema
var commentSchema = new mongoose.Schema({
    artileId :{
        type : Schema.Types.ObjectId,
        required : true,
        ref : "Article"
    },
    commentText : {
        type : String,
        required : true,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
})


module.exports = mongoose.model("Comment" , commentSchema);