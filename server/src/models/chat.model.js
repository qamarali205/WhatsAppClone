const {defalut:mongoose}=require("mongoose");

const chatSchema=mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    isGroupChat:{
        type:Boolean,
    },
    users:[{
        type:mongoose.Schema.Types.objectId,
        ref:"user"
    }],
    latestMessage:{
        type:mongoose.Schema.Types.objectId,
        ref:"message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.objectId,
        ref:"user"
    }

},{
    timestamp:true
});

const Chat=mongoose.model("chat", chatSchema);
module.exports=Chat;