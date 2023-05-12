const User = require("../models/user.model");

const findCurrentUser=async (res, req) =>{
    
    try{
        const user=await req.user;

        const currentUser=await User.findById(user.user._id);

        currentUser.password=null;

        return res.status(200).send(currentUser)
    }catch(err){
        return res.status(500).send(err.message)
    }
}

const findUserById=async (res, req) =>{
    
    try{
        

        const user=await User.findById(req.params.userId);

        user.password=null;

        return res.status(200).send(currentUser)
    }catch(err){
        return res.status(500).send(err.message)
    }
}

const searchUser=async (res,req) =>{

    try {
        const page=req.query.page || 1;
        const limits=req.query.size || 10;

        const skip=(page-1)*limits;
        const keyword=req.query.search?{
            $or:[
                {username:{$regex:req.query.search, $option:"i"}},
                {email:{$regex:req.query.search, $option:"i"}}
            ]
        }:{}
        const users=await User.find(keyword).select("username profile_image").skip(skip).limit(limits);

        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send(error.message)
        
    }
}

const editUser=async (res,req) =>{

    try {
       const updatedUser= await User.findByIdAndUpdate(req.params.id, req.body,{new:true});

       return res.status(200).send(updatedUser);

    } catch (error) {
        return res.status(500).send(error.message)
        
    }
}

const deleteUser=async (res,req) =>{

    try {
        const deletedUser= await User.findByIdAndDelete(req.params.id);

        return res.status(200).send({message:"User Delete Successfully", user:deletedUser})
        
    } catch (error) {
        return res.status(500).send(error.message)
        
    }
}

module.exports={findCurrentUser,findUserById,searchUser,editUser,deleteUser}