
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer';
import img6 from "../../images/Search.png";

const GameSection = () => {
  const [videos, setVideos] = useState([]);


  useEffect(() => {
    // Fetch all videos on mount
    fetchVideos();


    // Event listener to stop video when exiting fullscreen
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // Find all video elements, pause them, and reset their time to 0
        const videoElements = document.querySelectorAll('video');
        videoElements.forEach((videoElement) => {
          videoElement.pause();
          videoElement.currentTime = 0; // Reset video to the start
        });
      }
    };


    // Add the fullscreen change event listener
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari
    document.addEventListener('mozfullscreenchange', handleFullscreenChange); // Firefox
    document.addEventListener('MSFullscreenChange', handleFullscreenChange); // IE/Edge


    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);


  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/video');
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };


  return (
    <div className="bg-[#EB9721] w-full px-5  relative min-h-screen">
      <div className="bg-[#EBCEA8] w-full px-5">
        {/* Search Section */}
        <section className="flex justify-between pr-[10vh] pt-9 w-full">
          <p className="text-2xl font-semibold mb-4">Educational Videos</p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search videos here!"
              className="p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[100%] h-[4vh]"
            />
            <img
              src={img6}
              alt="Search Icon"
              className="absolute right-3 top-4 transform -translate-y-1/2 h-6 w-6 text-gray-400"
            />
          </div>
        </section> 
      

        {/* Videos Section */}
        <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center px-[20vh]">
          {videos.map((video) => (
            <div key={video.id} className="bg-[#F0BC78] p-4 rounded-lg shadow-lg w-full">
              <div className="relative">
                <video
                  id={`video-${video.id}`}
                  src={video.url}
                  className="rounded-md w-full"
                  preload="metadata"
                />
              </div>
              <h3 className="text-lg font-bold mt-2">{video.name}</h3>
              <p className="text-gray-600">{video.description}</p>
              <button
                onClick={() => {
                  const videoElement = document.getElementById(`video-${video.id}`);
                  if (videoElement.requestFullscreen) {
                    videoElement.requestFullscreen();
                  } else if (videoElement.webkitRequestFullscreen) { // Safari
                    videoElement.webkitRequestFullscreen();
                  } else if (videoElement.msRequestFullscreen) { // IE/Edge
                    videoElement.msRequestFullscreen();
                  }
                  videoElement.play(); // Start video when in fullscreen
                }}
                className="mt-4 px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-yellow-600"
              >
                WATCH
              </button>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
};


export default GameSection;


