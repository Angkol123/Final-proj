import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/Dashboard/lg.png";
import homeIcon from "../images/Dashboard/home.png";
import listIcon from "../images/Dashboard/list.png";
import userIcon from "../images/Dashboard/Tracking.png"
import video from "../images/Dashboard/video.png";
import LogoutModal from "./LogoutModal";
import logout from "../images/Dashboard/logout.png";

const Sidebar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalVisible(true);
  };

  const confirmLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/"); // Redirect to landingPage
  };

  return (
    <div className="bg-[#EB9721] w-69 h-screen p-7 flex flex-col items-center">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-24 h-auto mb-12" />

      <nav className="w-[100%] flex-grow flex flex-col ">
        <ul className="space-y-6 text-black text-lg flex flex-col items-center">
          <li className="group flex items-center space-x-4 hover:border-[#FFC77E]  transition-all duration-500 p-3">
            <Link
              to="/admin/dashboard"
              className="block text-black group-hover:scale-105 transform transition-all duration-200"
            >
              <img
                src={homeIcon}
                alt="Dashboard"
                className="w-8 h-8 transform group-hover:scale-110 transition-all duration-200"
              />
            </Link>
          </li>

          <li className="group flex items-center space-x-4 hover:border-[#FFC77E] transition-all duration-200 p-3">
            <Link
              to="/admin/user"
              className="block text-black group-hover:scale-105 transform transition-all duration-200"
            >
              <img
                src={listIcon}
                alt="Users"
                className="w-8 h-8 transform group-hover:scale-110 transition-all duration-200"
              />
            </Link>
          </li>

          <li className="group flex items-center space-x-4 hover:border-[#FFC77E]  transition-all duration-200 p-3">
            <Link
              to="/admin/tracking"
              className="block text-black group-hover:scale-105 transform transition-all duration-200"
            >
              <img
                src={userIcon}
                alt="Score Tracking"
                className="w-8 h-8 transform group-hover:scale-110 transition-all duration-200"
              />
            </Link>
          </li>

          <li className="group flex items-center space-x-4 hover:border-[#FFC77E]  transition-all duration-200 p-3">
            <Link
              to="/admin/upload"
              className="block text-black group-hover:scale-105 transform transition-all duration-200"
            >
              <img
                src={video}
                alt="Videos"
                className="w-8 h-8 transform group-hover:scale-110 transition-all duration-200"
              />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="mt-auto flex items-center space-x-3 cursor-pointer" onClick={handleLogout}>
        <img
          src={logout}
          alt="Logout"
          className="w-8 h-8 transform group-hover:scale-110 transition-all duration-200"
        />
        <span className="text-black text-lg">Logout</span>
      </div>

      <LogoutModal
        isVisible={isModalVisible}
        onConfirm={confirmLogout}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default Sidebar;
