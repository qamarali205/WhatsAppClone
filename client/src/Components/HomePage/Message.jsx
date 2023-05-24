import React from "react";

const Message = ({ isReqUserMessage, content, messageRef}) => {
  return (
    <div
      ref={messageRef}
      className={` py-2 px-2 rounded-md max-w-[50%] ${
        isReqUserMessage ? "self-start bg-white " : "self-end bg-[#d9fdd3]"
      }`}
    >
      
    <p>{content} </p>
    </div>
  );
};

export default Message;
