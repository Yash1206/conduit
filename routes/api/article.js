var express = require('express');
var Article = require('../../models/article');
var router = express.Router();
var authToken = require('../../modules/varifyToken');
var Tag = require('../../models/tags');
var User = require('../../models/user');
var Comment = require('../../models/comment');

///list all articles

router.get('/' , (req , res , next)=>{
    Article.find({} , (err , articles) =>{
        if(err) return res.json({msg : "Error finding articles"});
        return res.json({articles});
    });
});

//find one article

router.get('/:id' , (req , res , next) =>{
    var id = req.params.id;
    Article.findById(id , (err , article) =>{
        if(err) return res.json({msg : "Error finding the requested article"});
        //find comments of the article
        res.json({article});
    })
});

// get article from tag

router.get('/tag/:tag' , (req , res , next) =>{
    var tag = req.params.tag;
    Tag.findOne({tagText : tag} , (err , tag) =>{
        if(err) return res.json({msg : "Error finding tag" , err});
        var articleIdArr = tag.articleId;
        var articleArr = [];
        articleArr.forEach(e =>{
            Article.find({_id : e} , (err , article) =>{
                if(err) return res.json({msg : 'Error while finding article by tag' , err});
                articleArr.push(article);
                articleArr.length == articleIdArr.length ? res.json({articleArr}) : "";
            })
        })
    })
})
//Authorizing user
router.use(authToken.verifyToken);

//Creating new article

router.post('/new' , (req , res , next) =>{
    req.body.userId = req.userid;
    Article.create(req.body , (err , newArticle)=>{
        if(err) return res.json({msg : "Error creating new article" , err});
        //Creating Tags
        if(newArticle.tag){
            var tagArr = newArticle.tag.split(',');
            tagArr.forEach(e =>{
                Tag.findOne({tagText : e.trim()} , (err , existingTag) =>{
                    if (err) return res.json({msg : 'Error while finding tag.'});
                    if(!existingTag){
                        Tag.create({articleId :[newArticle.id] , tagText : e.trim()} , (err , tag) =>{
                            if(err) return res.json('Error while creating tag');
                        });
                    }else if(existingTag){
                        Tag.findByIdAndUpdate(existingTag.id , {$push: {articleId : newArticle.id}} , {new : true} , (err , updatedTag) =>{
                            if(err) return res.json({msg : 'Error while updating tag.'});
                        });
                    };
                });
            });
        };
        User.findOneAndUpdate({_id : newArticle.userId} , {$push:{articleId: newArticle.id}} , {new : true} ,(err , updatedUser) =>{
            if(err) return res.json({msg : 'Error updating user with array of articleId' , err});
            return res.json({msg : 'User updated sucessfully' , newArticle})
        })
    })
});

//Update an article

router.put('/:slug' , (req , res , next) =>{
    var slug = req.params.slug;
    var loggedInUser = req.userId;
    //Authorizing only the creator to make changes
    Article.findOne({slug} , (err , article) =>{
        if(err) return res.json({msg : 'Error finding the article' , err});
        if(loggedInUser === article.userId){
            Article.findOneAndUpdate({slug} , req.body , {new : true} , (err , updatedArticle)=>{
                if(err) return res.json({msg : 'Error updating article' , err});
                return res.json({updatedArticle});
            });
        }else{
            return res.json({msg : 'You cannot edit this article'});
        };
    });
});

//deleting article

router.delete('/:slug' , (req , res , next) =>{
    var slug = req.params.slug;
    var loggedInUser = req.userId;
    //Authorizing only the creator of the article to delete
    Article.findOne({slug} , (err , article) =>{
        if(err) return res.json({msg : 'Error deleting article' , err});
        if(!article) return res.json({msg : 'No article found'});
        if(loggedInUser == article.userid){
            Article.findOneAndDelete({slug} , (err , deletedArticle) =>{
                if(err) return res.json({msg : 'Error deleting article' , err});
                //Deleting comments alongwith aritcles
            })
        }
    })
})



module.exports = router;