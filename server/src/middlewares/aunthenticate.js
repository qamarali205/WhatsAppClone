require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tokenVerify = (token) => {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, process.env.THE_SECERET_TOKEN, function (err, user) {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

const aunthenticate = async (req, res, next) => {

  
  if (!req.headers?.authorization)
    return res.status(400).send({ message: "please provide a token" });

  const bearerToken = req.headers.authorization;

  if (!bearerToken.startsWith("Bearer "))
    return res.status(401).send({ message: "please provide a valide token" });

  const token = bearerToken.split(" ")[1];

  let user;

  try {
    user = tokenVerify(token);
    
  } catch (err) {
    return res.status(500).send(err.message);
  }
  req.user = user
  next();
};

module.exports = aunthenticate;
