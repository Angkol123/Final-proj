import React, { useEffect, useState } from "react";
import teach from "../../images/Dashboard/teach.png";
import tutor from "../../images/Dashboard/tutor.png";
import glowingstar from "../../images/Dashboard/glowingstars.png";
import axios from 'axios';

function Dashboard() {
  const [username, setUserName] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [videoActivities, setVideoActivities] = useState([]);
  const [error, setError] = useState(null);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }
    const today = new Date();
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
    fetchVideoActivities();
    fetchUserCount();
  }, []);

  // Fetch activities every 5 seconds
  useEffect(() => {
    fetchVideoActivities(); // Initial fetch

    const interval = setInterval(() => {
      fetchVideoActivities();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchVideoActivities = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/video/activities`);
      console.log('Fetched activities:', response.data); // Debug log
      setVideoActivities(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching video activities:', error);
      setError('Failed to fetch video activities');
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user-count`);
      setUserCount(response.data.totalUsers);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase();
    const lastNameInitial = nameParts[1]?.charAt(0).toUpperCase();
    return firstNameInitial + lastNameInitial;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="h-[92vh] bg-white-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-3 shadow-m rounded-md mb-6 border border-[#E9AF5E]">
        <div>
          <h2 className="text-gray-700 text-lg font-semibold">Dashboard</h2>
          <p className="text-sm text-gray-500">{currentDate}</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
            {username ? getInitials(username) : "??"}
          </div>
          <p className="text-gray-700">{username}</p>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-[#FFF0DD] p-4 rounded-md mb-4 relative overflow-hidden shadow-md flex flex-col md:flex-row items-center w-full h-[18vh]">
        <div className="absolute bottom-[2.6rem] flex space-x-1">
          <img src={glowingstar} alt="Glowing Star 1" className="w-30 h-20" />
        </div>
        <div className="flex-1 start font-fredoka mt-4 md:mt-[1rem] ml-0 md:ml-[3rem]">
          <h2 className="text-[30px] md:text-[40px] font-bold text-[#7E4F0E]">
            Your Classroom Awaits! Let's <br /> Inspire Together
          </h2>
        </div>
        <img
          src={teach}
          alt="Banner Illustration"
          className="absolute right-4 bottom-0 w-[80%] md:w-[22%] h-[20vh]"
        />
      </div>

      <h2 className="pb-5">Overview Cards </h2>
      <div className="flex gap-6 mt-0.25rem pb-5">
          {/* ipuli ang count sa totur */}
          <div className="bg-[#FAEFE2] p-3 rounded-md shadow-md text-center w-[600px] max-w-[550px] mt-0.25rem mb-0.25rem">
          <h2 className="text-black font-semibold mt-10 mb-4 text-left text-[20px] md:text-[22px]">Available Tutors</h2>
          <hr className="my-2 border-b border-brown-400 mx-auto w-25" style={{ borderWidth: '3px', borderColor: '#7E4F0E', borderRadius: '5px', boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.20)', position: 'outside' }} />
          <div className="flex items-center justify-center mt-6">
            <img src={tutor} alt="Available Tutor" className="w-24 h-24 mr-4" />
            <div className="text-7xl font-bold md:text-6xl" style={{ color: '#4B2E06' }}>
              {userCount}
            </div>
          </div>
        </div>

        <div className="bg-[#FAEFE2] p-3 rounded-md shadow text-center w-[33.3%]">
          <h2 className="text-lg font-semibold">Game Categories</h2>
          <div className="text-8xl font-bold text-brown-600" style={{ margin: '10px', color: '#7E4F0E' }}>3</div>
          <hr className="my-2 border-b border-brown-600 mx-auto w-28" style={{ borderWidth: '3px', borderColor: '#7E4F0E', borderRadius: '5px', boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.25)', position: 'outside' }} />
          <p className="text-sm text-black-500 mt-8 ml-4 font-semibold" style={{ fontSize: '22px' }}>Total</p>
        </div>

        <div className="bg-[#FAEFE2] p-3 rounded-md shadow text-center w-[33.3%]">
          <h2 className="text-lg font-semibold">Game Available</h2>
          <div className="text-8xl font-bold text-brown-600" style={{ margin: '10px', color: '#7E4F0E' }}>4</div>
          <hr className="my-2 border-b border-brown-600 mx-auto w-28" style={{ borderWidth: '3px', borderColor: '#7E4F0E', borderRadius: '5px', boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.25)', position: 'outside' }} />
          <p className="text-sm text-black-500 mt-8 ml-4 font-semibold" style={{ fontSize: '22px' }}>Overall Total</p>
        </div>
      </div>

      {/* Container for Available Tutors and Videos Activity Log */}
      <div className="flex flex-col md:flex-row gap-4 mt-0.25rem">
        {/* Available Tutors Card */}
        

        {/* Videos Activity Log Card */}
        <div className="bg-[#FAEFE2] p-2 rounded-2xl shadow-md w-full max-h-[200px] overflow-y-auto mt-0.25rem mb-0.25rem">
          <h4 className="text-[#323232] text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins' }}>
            Videos Activity Log
          </h4>
          <div className="divide-y divide-[#D7C6B5] text-xl">
            {error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : videoActivities.length > 0 ? (
              videoActivities.map((activity) => (
                <div key={activity.id} className="py-2 flex justify-between items-center text-custom-color">
                  <div>
                    <p className="text-[#000000]" style={{ fontFamily: 'Poppins' }}>
                      {formatDate(activity.timestamp)}
                    </p>
                    <p className="text-[#000000]" style={{ fontFamily: 'Poppins' }}>
                      {formatTime(activity.timestamp)}
                    </p>
                  </div>
                  <p className="text-[#323232] font-medium" style={{ fontFamily: 'Poppins' }}>
                    {activity.action === 'upload' 
                      ? `You uploaded "${activity.videoName}"`
                      : `You deleted "${activity.videoName}"`}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No video activities yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
