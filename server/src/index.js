const express=require('express');

const app=express();

app.use(express.json());

app.get("/", (req,res)=>{
    return res.send({message:"Welcome to whats App api"})
})

//auth
const authRoutes=require("./routes/auth.routes.js")
app.use("/",authRoutes);

//user
const userRoutes=require("./routes/user.routes.js");
app.use("/users",userRoutes);






module.exports=app;