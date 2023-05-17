const { default: mongoose } = require("mongoose");
const bycrypt=require('bcryptjs');

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    profile_image:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/06/29/08/16/system-825314__340.jpg'
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:Number,
        required:false
    },
   
},{timestamps:true})

userSchema.pre("save", function(next){
    if(!this.isDirectModified("password")) return next();

    this.password=bycrypt.hashSync(this.password, 8);
    this.username=this.username.toLowerCase();
    return next();
})

userSchema.methods.comparePassword=function(password){
    return bycrypt.compareSync(password, this.password);
}

const User=mongoose.model("user", userSchema);

module.exports=User;