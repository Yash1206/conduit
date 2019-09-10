var mongoose = require("mongoose");

///Tag Schema
var tagSchema = new mongoose.Schema({
    artileId :{
        type : [Schema.Types.ObjectId],
        required : true,
        ref : "Article"
    },
    tagText : {
        type : String,
        required : true,
    }
})


module.exports = mongoose.model("Comments" , tagSchema);