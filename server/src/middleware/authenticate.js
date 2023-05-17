const jwt=require("jsonwebtoken");
require("dotenv").config();


const verifyToken=()=>{
    return new Promise(function(resolve,reject){
        jwt.verify(token, process.env.SECRET_KEY,function(err,user){
            if(err) return reject(err);
            resolve(user)
        })
    })
}

const authenticate=async (req,res,next)=>{

    if(!req.headers?.authorization){
        return res.status(400).send({message:"Please provide a Token"});
    }

    const bearerToken=req.headers.authorization;

    if(!bearerToken.startWith("Bearer ")){
        return res.status(400).send({message:"Please a valid"})
    }

    const token=bearerToken.split(" ")[1];

    let user;

    try {
        user=verifyToken(token);
        
    } catch (error) {
        return res.status(400).send(error.message)
        
    }

    req.user=user;
    next();

}

module.exports=authenticate;