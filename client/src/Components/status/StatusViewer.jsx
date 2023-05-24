import React, { useEffect, useState } from "react";

import StatusProgressBar from "./StatusProgressBar";
import { story } from "./DummyStory";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io"

function StoryViewer() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentUserStoryIndex, setCurrentUserStoryIndex] = useState(0);
const navigate=useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextStory = () => {
    if (currentStoryIndex < story?.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else if (currentStoryIndex === story?.length - 1) {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      handleNextStory();
    } else if (event.key === "ArrowLeft") {
      handlePrevStory();
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextStory();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentStoryIndex]);

  console.log("story ---- ", story);

  return (
    <div className="w-full">

      <div
        className="flex justify-center items-center h-[100vh] bg-slate-900"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="relative">
            {/* Story image */}

          <img
            className="max-h-[96vh] object-contain"
            src={story?.[currentStoryIndex].image}
            alt="story"
          />

          {/* story progress bar */}
          <div className="absolute top-0 flex w-full">
            {story.map((story, index) => (
              <StatusProgressBar
                key={index}
                duration={2000}
                index={index}
                activeIndex={activeIndex}
                
              />
            ))}
          </div>
        </div>
      </div>


      <div className=" flex">
        <IoIosArrowRoundBack onClick={()=>navigate(-1)} className="text-white text-4xl cursor-pointer absolute top-5 left-10"/>
           <AiOutlineClose onClick={()=>navigate(-1)} className="text-white cursor-pointer absolute top-5 right-10 text-xl"/>
          
          </div>
    </div>
  );
}
export default StoryViewer;
