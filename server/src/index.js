const express=require('express');

const app=express();

app.use(express.json());

app.get("/", (req,res)=>{
    return res.send({message:"Welcome to whats App api"})
})

//auth
const authRoutes=require("./routes/auth.routes.js")
app.use("/auth",authRoutes);

//user
const userRoutes=require("./routes/user.routes.js");
app.use("/users",userRoutes);
//chat

const chatRoutes=require("./routes/chat.routes.js");
app.use("/chats",chatRoutes);


//message

const messageRoutes=require("./routes/message.routes.js");

app.use("/messages",messageRoutes);







module.exports=app;