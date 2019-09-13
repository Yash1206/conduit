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
    Article.create(req.body , (err , newArticle)=>{
        if(err) return res.json({msg : "Error creating new article"});
        return res.json({newArticle});
    })
});

//Update an article

router.put('/update/:id', (req , res , next) =>{
    var id = req.params.id;
    Article.findByIdAndUpdate(id, req.body, {new : true} , (err , updatedArticle) =>{
        if(err) return res.json({msg : "Error updating the article"});
        res.json({updatedArticle});
    })
});

//deleting article

router.delete('/delete/:id' , (req , res , next) =>{
    var id = req.params.id;
    Article.findByIdAndDelete(id , (err , deletedContent) =>{
        if(err) return res.json({msg : "Error deleting article"});
        return res.json({msg : "Success"});
    })
});





module.exports = router;