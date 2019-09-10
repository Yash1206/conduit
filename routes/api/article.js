var express = require('express');
var Article = require('../../models/article');
var router = express.Router();

///list all articles

router.get('/' , (req , res , next)=>{
    Article.find({} , (err , articles) =>{
        if(err) return res.json({msg : "Error finding articles"});
        return res.json({articles});
    })
})

//find one article

router.get('/:id' , (req , res , next) =>{
    var id = req.params.id;
    Article.findById(id , (err , article) =>{
        if(err) return res.json({msg : "Error finding the requested article"});
        //find comments of the article
        res.json({article});
    })
})

//Creating new article

router.post('/new' , (req , res , next) =>{
    Article.create(req.body , (err , newArticle)=>{
        if(err) return res.json({msg : "Error creating new article"});
        return res.json({newArticle});
    })
})

//Update an article

router.put('/update/:id' , (req , res , next) =>{
    var id = req.params.id;
    Article.findByIdAndUpdate(id , {new : true} , (err , updatedArticle) =>{
        if(err) return res.json({msg : "Error updating the article"});
        res.json({updatedArticle});
    })
})

//deleting article

router.delete('/delete/:id' , (req , res , next) =>{
    var id = req.params.id;
    Article.findByIdAndDelete(id , (err , deletedContent) =>{
        if(err) return res.json({msg : "Error deleting article"});
        return res.json({msg : "Success"});
    })
})





module.exports = router;