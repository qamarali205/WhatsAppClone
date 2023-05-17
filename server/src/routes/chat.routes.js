const {Router}=require("express");
const authenticate = require("../middleware/authenticate");
const { createChat, getAllChat, renameGroup, addUserToGroup, removeUserFromGroup } = require("../Controllers/chat.controller");

const router=Router();

// "/chats/"
router.post("/", authenticate, createChat);

router.get("/", authenticate, getAllChat);

// "/chats/rename/""

router.put("/rename",authenticate,renameGroup);

// "/chats/add/user/"
router.put("/add/user", authenticate, addUserToGroup);

// "/chats/remove/"
router.put("/remove/user", authenticate,removeUserFromGroup)


module.exports=router;

