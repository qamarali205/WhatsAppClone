import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { TbCircleDashed } from 'react-icons/tb';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im'
import ChatCard from './chatCard/ChatCard';
import pic from '../images/connect.png';
import MessageCard from './messageCard/MessageCard';

import './home.css';
import Profile from './profile/Profile';

const Home = () => {
  const [querys, setQuerys]=useState(null);
  const [currentChat, setCurrentChat]=useState(null);
  const [content, setContent]=useState("");
  const [isProfile, setIsProfile]=useState(false);
  const navigate=useNavigate();

  const handelOnChat=()=>{
    setCurrentChat(true);
  }

  const handelSearch=()=>{

  }

  const handelCreateNewMessage=()=>{
    
  }
 const handelNavigate=()=>{
  // navigate("/profile")
  setIsProfile(true);

 }

  return (
    <div className='relative'>
      <div className='py-14 bg-[#00a884]'></div>

      <div className='flex bg-[#f0f2f5] h-[94vh] absolute top-[5vh] left-[2vw] w-[96VW]'>
        <div className="left w-[30%] bg-[#e8e9ec] h-full">
          {/* proflie */}

              {isProfile && <div className='w-full h-full'><Profile /></div>}
              {/* home */}
            {!isProfile && <div className="w-full">
              

              
               <div className='flex justify-between items-center p-3'>
                    <div onClick={handelNavigate} className='flex items-center space-x-3'>
                        <img className='rounded-full h-10 w-10 cursor-pointer' src="https://cdn.pixabay.com/photo/2023/04/27/14/00/cat-7954713_960_720.jpg" alt="dummy" />
                        <p>userName</p>
                    </div>
                    <div className='space-x-3 flex text-xl'>
                        <TbCircleDashed/>
                        <BiCommentDetail/>
                    </div>
                </div>

                <div className='relative flex justify-center items-center bg-white py-4 px-3'>
                  <input className='border-none outline-none bg-slate-200 rounded-md py-2 w-[93%] pl-9'
                   placeholder='Search or start new chat' type="text"
                   onChange={(e)=>{
                    setQuerys(e.target.value)
                    handelSearch(e.target.value)
                   }}
                   value={querys} />
                  <AiOutlineSearch className='absolute left-5 top-7'/>
                  <div className='ml-4 text-3xl'>
                    <BsFilter/>
                  </div>
                </div>
                {/* all users */}
                <div className='bg-white overflow-y-scroll h-[70vh] px-3'>
                  {querys && [1,2,3,4,5,2,4,5,6,7,1,7,7,8,1,1,4,7,7,8,7,7,7,7].map((item,index)=>
                  <div onClick={handelOnChat}><hr />
                    <ChatCard key={index}/></div>)}
                </div>
            </div>}
        </div>
        
         {/* default whats app page */}

         {!currentChat &&  <div className='w-[70%] flex flex-col justify-center items-center h-full'>
            <div className='max-w-[70%] text-center'>
              <img src={pic} alt="chat" />
              <h1 className='text-4xl text-gray-600'>WhatsApp Web</h1>
              <p className='my-9 '>send and receive message without keeping your phone online. Use WhatsApp on Up to 4 Linked devices  and 1 phones at the 
                same time.</p>
            </div>
          </div>}


          {/* Chatting parts */}

          {currentChat && <div className='w-[70%] relative'>
            <div className='header absolute top-0 w-full bg-[#f0f2f5]'>
              <div className='flex justify-between'>
                <div className='py-3 space-x-4 flex items-center px-3'>
                  <img className='w-10 h-10 rounded-full' src="https://cdn.pixabay.com/photo/2023/04/08/15/06/portrait-7909587__340.jpg" alt="user" />
                  <p>username</p>
                </div>
                <div className='py-3 space-x-4 flex items-center px-3 '>
                  <AiOutlineSearch/>
                  <BsThreeDotsVertical/>
                </div>
              </div>
            </div>
            {/* message section */}
            <div className='px-10 h-[85vh] overflow-y-scroll bg-[#ece5dd]'>
              <div className='space-y-1 flex flex-col justify-center mt-20 py-2'>
                {[1,1,1,1,1,1,1].map((item,index) => 
                  <MessageCard key={index} isReqUserMessage={index%2===0} content={"message"}/>
                )}
              </div>
            </div>

            {/* message type parts footer or msg editor */}
            <div className="footer bg-[#f0f2f5] absolute  bottom-0 w-full py-3 text-2xl">

              <div className='flex justify-between items-center px-5 relative'>
                
                  <BsEmojiSmile className='cursor-pointer' />
                  <ImAttachment className='cursor-pointer'/>
                

                <input className='py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]'
                onChange={(e)=>setContent(e.target.value)} type="text"
                placeholder='Type message Here'
                value={content}
                onKeyPress={(e)=>{
                  if(e.key==="Enter"){
                    handelCreateNewMessage();
                    setContent("");
                  }
                }} />

                <BsMicFill />
                    
              </div>
            </div>


          </div> }
        
      </div>

    </div>
  )
}

export default Home;
