require("dotenv").config();
const mongoose = require("mongoose")

const dataBase = process.env.MONGODB_ATLAST;

const connect =async () => {
   // return mongoose.connect("mongodb+srv://ashokzarmariya:yugraal8346@cluster0.ithqjss.mongodb.net/?retryWrites=true&w=majority");
      return mongoose.connect("mongodb+srv://qamar:qamar@cluster0.nzazjtk.mongodb.net/?retryWrites=true&w=majority");
   //   return mongoose.connect("mongodb://localhost:27017");
}

module.exports = connect; 

