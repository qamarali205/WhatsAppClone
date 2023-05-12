import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2, BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [flag, setFlag]=useState(false);
    const navigate=useNavigate();
    const [username,setUsername]=useState(null)

    const handleNavigate=()=>{
        navigate(-1);
    }
     
    const handleUserName=()=>{
        setFlag(true);
    }

    const handleCheckClick=()=>{
        setFlag(false)
    }
    const handleChange=(e)=>{
        setUsername(e.target.value);
    }
  return (
    <div className='w-full h-full'>
        <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
            <BsArrowLeft onClick={handleNavigate} className='cursor-pointer text-2xl font-bold'/>
            <p className='cursor-pointer font-semibold'>Profile</p>
        </div>   
             {/* update profile pic section  */}
            <div className='flex flex-col justify-center items-center my-12'>
                <label htmlFor="imgInput">
                    <img className='rounded-full w-[15vw] h-[15vw] cursor-pointer' src="https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_960_720.jpg" alt="profile_image" />
                </label>
                <input type="file" id='imgInput' className='hidden'/>
            </div> 
             {/* update name section  */}
             <div className='bg-white px-3'>
                <p className='py-3 cursor-pointer text-[#008069]'>Your Name</p>
            {!flag && 
                <div className='w-full flex justify-between items-center'>
                    <p className='py-3'>{username || "Qamar Ali"}</p>
                    <BsPencil onClick={handleUserName} className='cursor-pointer'/>
                </div>
            }
            {flag && <div className='w-full flex justify-between items-center py-2'>
                <input onChange={handleChange} className='w-[80%] outline-none border-b-2 border-blue-700 p-2' type="text" placeholder='Enter your name' />
                <BsCheck2 onClick={handleCheckClick} className='cursor-pointer text-2xl'/>
            </div>}
            </div>
            <div className='px-3 my-5'>
                <p className='py-10'>
                    This is not your username or pin. This name will be visible to your WhatsApp contacts.
                </p>
            
            </div>
            {/* <div className='bg-white p-4'>
                <p className='py-3 cursor-pointer text-[#008069]'>About</p>
                <div className='flex justify-between items-center'>
                    <p className='py-3'>Talash Kar Meri Kami Ko Apne Dil Mein... Dard Huwa Toh Samajh Lena Mohabbat Ab Bhi Baaki Hai...!!</p>
                    <BsPencil className='cursor-pointer text-2xl'/>
                </div>
            </div>   */}
    </div>
  )
}

export default Profile;
