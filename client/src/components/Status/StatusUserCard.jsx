import React from 'react'
import { useNavigate } from 'react-router-dom'

const StatusUserCard = ({user}) => {
    const navigate=useNavigate();

    const handleNavigate=()=>{
        navigate(`/status/{userId}`)
    }
  return (
    <div onClick={handleNavigate} className='flex items-center p-3 cursor-pointer'>
        <di >
            <img className='h-7 w-7 lg:w-10 lg:h-10 rounded-full' src={user?.profilePic} alt="" />
        </di>

        <div className='ml-2 text-white'>
            <p>{user?.username}</p>
        </div>
    </div>
  )
}

export default StatusUserCard