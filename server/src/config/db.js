const mongoose=require("mongoose");

const connect=()=>{
    return mongoose.connect("mongodb+srv://qamar:qamar@cluster0.nzazjtk.mongodb.net/?retryWrites=true&w=majority");
}


module.exports=connect;

// mongodb+srv://qamar:qamar@cluster0.nzazjtk.mongodb.net/?retryWrites=true&w=majority