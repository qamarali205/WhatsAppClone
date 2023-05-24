const express = require("express");
const Message = require("../models/message.modal");
const User = require("../models/user.model");
const Chat = require("../models/chat.modal");
const aunthenticate = require("../middlewares/aunthenticate");
const router = express.Router();

//@description     Get all Messages

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username fullname profilePic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
router.get("/getall/:chatId", aunthenticate, allMessages);

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  const reqUser = await req.user;
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.status(400).send({message:"chatId and message are required"});
  }

  var newMessage = {
    sender: reqUser.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "username profilePic")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "username profilePic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

router.post("/createnew", aunthenticate, sendMessage);

module.exports = router;
