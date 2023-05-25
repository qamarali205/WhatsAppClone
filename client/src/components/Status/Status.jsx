import React from "react";
import StatusUserCard from "./StatusUserCard";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Status = () => {
    const navigate=useNavigate();
    const { auth, chat, message } = useSelector((store) => store);

    const user=[
      {profilePic:"https://cdn.pixabay.com/photo/2022/11/19/10/00/tiger-7601733__340.jpg",username:"lione"},
      {profilePic:"https://cdn.pixabay.com/photo/2023/04/11/18/31/duck-7917949__340.jpg",username:"aman"}
    ]

  return (
    <div>
      <div className="w-100vh flex items-center px-[14vw] py-[7vh]">
        <div className="left h-[85vh] bg-[#1e262c] lg:w-[30%] w-[50%] px-5">
          <div className="pt-5 h-[13%]">
            <StatusUserCard user={auth.reqUser} />
          </div>
          <hr />
          <div className=" overflow-y-scroll h-[86%] pt-2">
            {user.map((item) => (
              <StatusUserCard user={item} />
            ))}
            {/* <StatusUserCard /> */}
          </div>
        </div>
        <div className="relative right h-[85vh] lg:w-[70%] w-[50%] bg-[#0b141a]">

        <AiOutlineClose onClick={()=>navigate(-1)} className="text-white cursor-pointer absolute top-5 right-10 text-xl"/>
        </div>
      </div>
    </div>
  );
};

export default Status;
