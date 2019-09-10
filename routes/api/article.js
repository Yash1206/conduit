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








module.exports = router;