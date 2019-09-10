var jwt = require('jsonwebtoken');

exports.verifyToken = function(req , res , next){
    const token = req.header.authorization || "";
    const secret = process.env.secret;
    if(token){
        jwt.varify(token , secret , function(err , decoded){
            if(err) return res.json(err);
            req.userid = decoded.userId;
            console.log(req.userid);
            next();
        })
    }else{
        return res.json({msg : "User not logged in"});
    }
}