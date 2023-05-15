import React from 'react';
import { useNavigate } from 'react-router-dom';

const StatusUserCard = () => {
    const navigate=useNavigate();

    const handleNavigate=()=>{
        navigate(`/status/{userId}`)

    }
  return (
    <div onClick={handleNavigate} className='flex items-center p-3 cursor-pointer'>
        <div className=''>
            <img className='h-7 w-7 lg:w-10 lg:h-10 rounded-full' src="https://media.istockphoto.com/id/1390836689/photo/english-teacher-giving-lesson-on-modal-verbs-near-whiteboard-in-classroom.jpg?s=1024x1024&w=is&k=20&c=9EOMXywsv9dHzyrYlsHrJN6lhyAMQarI4fTxxoPfBLM=" alt="userImage" />
        </div>
        <div className='ml-2 text-white'>
            <p>Qamar Ali</p>
        </div>
      
    </div>
  )
}

export default StatusUserCard;
