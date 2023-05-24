const { Router } = require("express");
const { route } = require("..");
const aunthenticate = require("../middlewares/aunthenticate");
const Status = require("../models/status.modal");
const router=Router();

router.post("/",aunthenticate,async(req,res)=>{
    try{
        const status=await Status.create(req.body);
        return res.status(200).send(status);
    }
    catch(error){
        return res.status(500).send(error.message);
    }
})

router.get("/:statusId", aunthenticate, async (req, res) => {
    try {
      const status = await Status.findById(req.params.statusId).populate("user", "-password")
  
      if (!status) res.status(400).send({ error: "Invalid Status Id" });
      return res.status(200).send(status);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

  module.exports=router;