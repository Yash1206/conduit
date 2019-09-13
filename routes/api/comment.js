var express = require('express');
var Comment = require('../../models/comment');
var Article = require('../../models/article');
var authToken = require('../../modules/varifyToken');
var router = express.Router();

//Read comments

router.get('/:articleId' , (req , res , next)=>{
    var id = req.params.id;
    Comment.find({articleId : id} , (err , comment) =>{
        if(err) return res.json({msg : 'Error finding comments'});
        return res.json({comment});
    });
});

//authorize only logged in users 
router.use(authToken.verifyToken);

//Add comments
router.post()

