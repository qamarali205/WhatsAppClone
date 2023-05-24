require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.THE_SECERET_TOKEN);
}
 
///ok ok ok ok ok


const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec();
        if (user)
            return res.status(400).send({ error: "email is alredy exist",isAuth:false });
        
        const isUsernameTeken = await User.findOne({ username: req.body.username }).lean().exec();
        if (isUsernameTeken)
            return res.status(401).send({error:"This username is alredy taken"})
        
        user = await User.create(req.body);

        const token = newToken(user);
        
        
        res.status(201).send({token, isAuth:true, message:"Register Success"})
    }
    catch (err) {
        return res.status(500).send({"error from api": err});
    }
};

const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send({ error: "user is not exist",isAuth:false });
        
        const match = user.comparePassword(req.body.password);
       

        if (!match)
            return res.status(402).send({ error: "incorrect password or email", isAuth:false })
        
        const token = newToken(user);

        
        user.password = null;
        return res.status(201).send({ token, isAuth:true, message:"Login Success" });
    }
    catch (err) {
        return res.status(500).send({"error from api": err});
    }
};


  


module.exports = { register, login };
