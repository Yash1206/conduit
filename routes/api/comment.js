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
router.post('/new/:articleId' , (req , res , next) =>{
    var id = req.params.id;
    req.body.userId = req.userid;
    req.body.articleId = id;
    console.log(req.body);
    Comment.create(req.body , (err , newComment) =>{
        if(err) return res.json({msg : 'Error creating comment' , err});
        Article.findOneAndUpdate({_id :newComment.articleId} , {$push : {commentsId : newComment.id}} , {new : true , upsert : false} , (err , updated) =>{
                if(err) return res.json({msg : "Error updating article with comment array", err});
                return res.json({msg : 'Article update successful', newComment});
        });
    });
});

//Delete comment
router.delete('/delete/:commentId' , (req , res , next) =>{
    var id = req.params.commentId;
    var loggedUser = req.userid;
    Comment.findById(id , (err , comment) =>{
        if (err) return res.json({msg : 'cannot find the comment' , err});
        if (loggedUser == comment.userId){
            Comment.findById(id , (err , deletedComment) =>{
                if(err) return res.json({msg : 'Error deleting comment' , err});
                return res.json('Comment deleted');
            });
        }else{
            return res.json({msg : 'You cannot delete this commen'})
        }
    })
})

