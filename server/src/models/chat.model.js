const {default:mongoose}=require("mongoose");

const chatSchema=mongoose.Schema({
    chatName:{
        type:String,
        trim:true,
    },
    isGroupChat:{
        type:Boolean,
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message",
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },

},{
    timestamps:true
});

const Chat=mongoose.model("chat", chatSchema);

module.exports=Chat;