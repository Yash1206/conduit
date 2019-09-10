var express = require('express');
var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var router = express.Router();

//Sign up 
router.post('/signup' , (req , res , next)=>{
  
  User.create(req.body , (err , createdUser) =>{
    if(err) return res.json({msg : "error while creating new user"});
    return res.json({createdUser});
  })
})

//Sign in

router.post('/signin' , (req , res , next) =>{
  var email = req.body.email;
  var password = req.body.password;

  // Finding User

  User.findOne({email} , (err , user) =>{
    if(err) return res.json({msg : "Error finding User"});
    if(!user) return res .json({msg : "User Not "});
    if(!user.comparePassword(password)) return res.json({msg : "Password does not match"});

    //Generate token'

    const token = jwt.sign({userId : user._id} , process.env.secret);
    res.json({token});
  })
})

module.exports = router;
