/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, register } from "../../Redux/Auth/Action";
import SimpleSnackbar from "../HomePage/SimpleSnackbar";

const Signup = () => {
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
 const dispatch = useDispatch();
 const {auth}=useSelector((store)=>store)
  const [open, setOpen] = useState(false);
  
const token = localStorage.getItem("token");
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
 };

//dispatch current user if user already signup
 useEffect(() => {
  
  if (token) dispatch(currentUser(token))
 
 }, [auth.isAuth,token])
 

 //redirect to main page if register success
 useEffect(() => {
  if (auth.reqUser) {
  
   navigate("/")
  }
 },[auth.reqUser])
 

// dispacth register action
  const handleSubmit = (event) => {
   event.preventDefault();
   dispatch(register(inputData))
    
  };


  useEffect(() => {
    if (auth.signup?.isAuth===false) {
      setOpen(true)
    }
  },[auth.signup])
  return (

    <div>
      <div className="flex flex-col justify-center min-h-screen items-center">
      <div className="w-[40%] p-10 shadow-md bg-white">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="mb-2">User Name</p>
            <input
              className="py-2 px-3 outline outline-green-600 w-full rounded-md border-1"
              type="text"
              placeholder="Enter username"
              name="username"
              onChange={(e) => handleChange(e)}
              value={inputData.username}
            />
          </div>
          <div>
            <p className="mb-2">Email</p>
            <input
              className="py-2 px-3 outline outline-green-600 w-full rounded-md border-1"
              type="text"
              placeholder="Enter your Email"
              name="email"
              onChange={(e) => handleChange(e)}
              value={inputData.email}
            />
          </div>
          <div>
            <p className="mb-2">Password</p>
            <input
              className="py-2 px-2 outline outline-green-600 w-full rounded-md border-1"
              type="text"
              placeholder="Enter your Password"
              name="password"
              onChange={(e) => handleChange(e)}
              value={inputData.password}
            />
          </div>
          <div>
            <input
              className="py-[0.7rem] px-3 w-full rounded-md bg-green-600 text-white mt-3"
              type="Submit"
              placeholder="Enter your Password"
              value={"Signup"}
              readOnly
            />
          </div>
        </form>
        <div className="flex space-x-3 item-center mt-5">
          <p className="">Already Have Account?</p>
          <p
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-800 cursor-pointer"
          >
            Login
          </p>
        </div>
      </div>
      </div>
      <SimpleSnackbar
        message={auth.signup?.message}
        open={open}
        handleClose={handleClose}
        type={"error"}
      />
    </div>
    
  );
};

export default Signup;
