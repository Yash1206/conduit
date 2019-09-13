var mongoose = require("mongoose");
var Schema = mongoose.Schema;
///Tag Schema
var tagSchema = new Schema({
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


module.exports = mongoose.model("Tag" , tagSchema);