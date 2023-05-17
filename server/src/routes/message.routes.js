const { Router } = require("express");
const authenticate = require("../middleware/authenticate");
const { getAllMessage, createMessage } = require("../Controllers/message.controller");

const router=Router();


// "/message/userId"
router.get("/:chatId", authenticate, getAllMessage);

// "/message"
router.post("/",authenticate, createMessage);

module.exports=router;