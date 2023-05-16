const Chat = require("../models/chat.model");


const createChat=async (req,res)=>{
    try {
        const {userId}=req.body;

        const reqUser=await req.user;
        if(!userId){
            return res.status(400).json({error:"User Id require for creating chat"});
        }

        var isChat=await Chat.find({
            isGroupChat:false,
            $and:[
                {users:{$eleMatch:{$eq:reqUser.user._id}}},
                {users:{$eleMatch:{$eq:reqUser.userId}}},

            ]
        }).populate("users", "password").populate("latestmessage");

        isChat=await User.populate(isChat,{
            path:"latestMessage.sender",
            select:"name profile_image email"
        })
        
    } catch (error) {
        
    }
}