const { Router } = require("express");
const { registerUser, loginUser } = require("../Controllers/auth.controller");


const router=Router();

router.post("/signup", registerUser)
router.post("/signup", loginUser)


module.exports=router;