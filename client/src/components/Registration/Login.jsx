/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, login } from "../../Redux/Auth/Action";
import SimpleSnackbar from "../HomePage/SimpleSnackbar";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);

 const navigate = useNavigate();
 const dispatch = useDispatch();
 const {auth}=useSelector((store)=>store)
  const token = localStorage.getItem("token");

  console.log("auth",auth)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(inputData))
  };
  
 const handleClose = () => setOpen(false)

 //dispatch current user if user already signup
 useEffect(() => {
  
  if (token) dispatch(currentUser(token))
  
 }, [token])
 

 //redirect to main page if register success
 useEffect(() => {
   if (auth.reqUser) {
    
    navigate("/")
  }
 }, [auth.reqUser])
  
  useEffect(() => {
    if (auth.login?.error) {
      setOpen(true)
    }
  },[auth.login])

  return (
    <div>
      <div className="flex justify-center min-h-screen items-center">
      <div className="w-[40%] p-10  shadow-md bg-white">
        <form onSubmit={handleSubmit} className="space-y-5">
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
              value={"Login"}
              readOnly
            />
          </div>
        </form>
         <div>
            <input
              className="py-[0.7rem] px-3 w-full rounded-md bg-green-600 text-white mt-3"
              type="Submit"
              value={"Get Guest User Credentials"}
              onClick={() => { 
                setInputData({
                  ...inputData,
                  email: "admin@gmail.com",
                  password: "admin"
                }); 
              }}

              readOnly
            />
          </div>
        <div className="flex space-x-3 item-center mt-5">
          <p className="">Create New Account</p>
          <p
            onClick={() => navigate("/Signup")}
            className="text-blue-500 hover:text-blue-800 cursor-pointer"
          >
            signup
          </p>
        </div>
{/*         <h3>For Login Demo Id Password</h3>
        <div className="flex space-x-3 item-center mt-2">
          <p className="">Email-</p>
          <p className="text-blue-500 hover:text-blue-800">admin@gmail.com</p>
        </div>
        <div className="flex space-x-3 item-center mt-2">
          <p className="">Password-</p>
          <p className="text-blue-500 hover:text-blue-800">admin</p>
        </div> */}
      </div>
     
      </div>
      <SimpleSnackbar
        message={auth.login?.error}
        open={open}
        handleClose={handleClose}
        type={"error"}
      />
    </div>
    
  );
};

export default Login;
