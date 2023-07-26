import React from "react";
import { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/Auth/Action";
import SimpleSnackbar from "./SimpleSnackbar";

const Profile = ({ handleBack }) => {
  const { auth } = useSelector((store) => store);
  const [tempPicture, setTempPicture] = useState(null);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(auth.reqUser.username);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const data = {
    id: auth.reqUser._id,
    token: localStorage.getItem("token"),
    data: { username },
  };

  const handleClose = () => setOpen(false);
  return (
    <div className=" w-full h-full">
      <div className=" flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft
          onClick={handleBack}
          className="cursor-pointer text-2xl font-bold"
        />
        <p className="text-xl font-semibold">Profile</p>
      </div>

      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img
            className="rounded-full w-[15vw] h-[15vw] cursor-pointer"
            src={tempPicture || auth.reqUser.profilePic}
            alt=""
          />
        </label>

        <input
          type="file"
          id="imgInput"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const uploadPic = (pics) => {
              const data = new FormData();
              data.append("file", pics);
              data.append("upload_preset", "ashok21");
              data.append("cloud_name", "zarmariya");
              fetch("https://api.cloudinary.com/v1_1/zarmariya/image/upload", {
                method: "post",
                body: data,
              })
                .then((res) => res.json())
                .then((data) => {
                  setTempPicture(data.url.toString());
                  setMessage("profile image updated successfully")
                  setOpen(true);
                  console.log("imgurl", data.url.toString());
                  const dataa = {
                    id: auth.reqUser._id,
                    token: localStorage.getItem("token"),
                    data: { profilePic: data.url.toString() },
                  };
                  // userUpdate(id, )
                  dispatch(updateUser(dataa));
                  
                });
            };
            if (!e.target.files) return;

            uploadPic(e.target.files[0]);
          }}
        />
      </div>

      <div className="bg-white px-3 ">
        <p className="py-3">Your Name</p>
        {!flag && (
          <div className="w-full flex justify-between items-center">
            <p className="py-3">{username || auth.reqUser?.username}</p>
            <BsPencil
              onClick={() => {
                setFlag(true);
                console.log(flag, "-----");
              }}
              className="cursor-pointer"
            />
          </div>
        )}

        {flag && (
          <div className="w-full flex justify-between items-center py-2">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="w-[80%] outline-none border-b-2 border-blue-700 px-2  py-2"
              type="text"
              placeholder="Enter you name"
              value={username}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  dispatch(updateUser(data));
                  setFlag(false);
                }
              }}
            />
            <BsCheck2
              onClick={() => {
                setMessage("name updated successfully")
                dispatch(updateUser(data));
                setFlag(false);
                setOpen(true);
              }}
              className="cursor-pointer text-2xl"
            />
          </div>
        )}
      </div>

      <div className="px-3 my-5">
        <p className="py-10">
          this is not your username, this name will be visible to your whatapp
          contects.
        </p>
      </div>

      <SimpleSnackbar
        message={message}
        open={open}
        handleClose={handleClose}
        type={"success"}
      />
    </div>
  );
};

export default Profile;
