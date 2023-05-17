
const Chat = require("../models/chat.model");
const User = require("../models/user.model");

const createChat = async (req, res) => {
  try {
    const { userId } = req.body;

    const reqUser = await req.user;
    if (!userId) {
      return res
        .status(400)
        .json({ error: "User Id require for creating chat" });
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $eleMatch: { $eq: reqUser.user._id } } },
        { users: { $eleMatch: { $eq: reqUser.userId } } },
      ],
    })
      .populate("users", "password")
      .populate("latestmessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name profile_image email",
    });
    if (isChat.length > 0) {
      return res.status(200).send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        user: [reqUser.user._id, userId],
      };
    }
    const createdChat = await Chat.create(chatData);

    const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
      "users",
      "-password"
    );

    return res.status(200).send(fullChat);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getAllChat = async (req, res) => {
  try {
    const reqUser = await req.user;
    const chats = await Chat.find(
      { users: reqUser.user._id }.populate("users", "-password")
    )
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ timestamp: -1 });

      return res.status(200).send(chats);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const createGroup=async (req, res) =>{
    let {users, chatName}=req.body;

    users.push(reqUser.user)
    
    const reqUser=await req.user;

    if(!users || !chatName){
        return res.status(400).send({error:"users and chatName are required filled"});
    }

    if(users.length<2){
        return res.status(400).send({error:"minimum two users required to create a new group"});
    }

    try {
        
        const createdGroup=await Chat.create({
            chatName,users,groupAdmin:reqUser.user._id,isGroupChat:true,
        });

        const fullChat=await Chat.findById(createGroup._id).populate( "users","-password").populate("groupAdmin","-password");

        return res.status(200).send(fullChat);
        
    } catch (error) {
        return res.status(400).send(error.message);
    }
}


const renameGroup=async (req, res) =>{

    try{
    const {chatId, chatName}=req.body;

    const updatedChat=await Chat.findByIdAndUpdate(
        chatId,{chatName},{new:true}
    ).populate("users", "-password").populate("groupAdmin", "-password");

    return res.status(200).send({message:"update groupname",chat:updatedChat});

    }catch(error){
        return res.status(400).send(error.message);
    }
};

const addUserToGroup=async (req, res) =>{

    try{
    const {chatId, userId}=req.body;

    const isChat=await Chat.findById(chatId);

    if(!isChat){
        return res.status(400).send({error: "chat not found with id"+ chatId});
    }

    const isUser=await User.findById(userId);
    if(!isUser){
        return res.status(400).send({error:"user not found with id" +userId});
    }

    const updatedGroup=await Chat.findByIdAndUpdate(chatId,{$push:{users:userId}},{new:true}).populate("users", "-password").populate("groupAdmin", "-password");

    return res.status(200).send({message:isUser.username+"add to group", chat:updatedGroup});
   
    }catch(error){
        return res.status(400).send(error.message);
    }
};

const removeUserFromGroup=async (req, res) =>{

    try{
    const {chatId, userId}=req.body;

    const isChat=await Chat.findById(chatId);

    if(!isChat){
        return res.status(400).send({error: "chat not found with id"+ chatId});
    }

    const isUser=await User.findById(userId);
    if(!isUser){
        return res.status(400).send({error:"user not found with id" +userId});
    }

    const updatedGroup=await Chat.findByIdAndUpdate(chatId,{$pull:{users:userId}},{new:true}).populate("users", "-password").populate("groupAdmin", "-password");

    return res.status(200).send({message:isUser.username+"user remove from group", chat:updatedGroup});
   
    }catch(error){
        return res.status(400).send(error.message);
    }
};

module.exports={createChat,getAllChat,createGroup,renameGroup,addUserToGroup,removeUserFromGroup}