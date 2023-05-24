const { Router } = require("express");
const aunthenticate = require("../middlewares/aunthenticate");
const router = Router();
const User = require("../models/user.model");

router.get("/currentUser", aunthenticate, async (req, res) => {
  try {
    const user = await req.user;
    const currentUser = await User.findById(user.user._id).lean().exec();
    console.log(user.user);
    user.user.password = null;
    currentUser.password = null;

    return res.status(200).send(currentUser);
  } catch (error) {
    return res.status(401).send(error.message);
  }
});

router.get("/:userid", aunthenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.userid).select("-password");

    if (!user) res.status(400).send({ message: "invalid userid" });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limits = req.query.size || 10;

    const skips = (page - 1) * limits;

    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    console.log(req.query);
    //{ password: 0, token: 0, mobile: 0, email: 0,isNewNotifications:0,notifications:0 }
    const users = await User.find(keyword)
      .select("username profilePic")
      .skip(skips)
      .limit(limits);

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne(
      { username: username },
      { password: 0, token: 0, mobile: 0, email: 0, notifications: 0 }
    )
      .lean()
      .exec();

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec();
    res.status(201).send(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});



router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    res.status(201).send(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
