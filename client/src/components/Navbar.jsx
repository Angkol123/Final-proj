import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from "../images/footer/logo.png"; 
import img2 from "../images/Vd.png";
import img1 from "../images/Gm.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); 

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen); 
  };

  const closeMenu = () => {
    setMenuOpen(false); 
  };

  return (
    <>
      {/* Navbar Section */}
      <nav className="bg-[#F5F5F5] w-full sticky top-0  z-999 px-[5%]" style={{ zIndex: 999 }}>
        <div className="container flex justify-between items-center">

          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={img} alt="Logo" className="w-[10vh] h-[8vh] sm:w-[8vh] sm:h-[6vh] md:w-[12vh] md:h-[9vh] py-1" />
            </Link>
          </div>

        
          <div className="flex items-center space-x-22 gap-6 sm:gap-4 md:gap-9">
  {/* Games Button */}
  <Link to="/GamesSection" className="hidden sm:flex items-center space-x-2 text-black hover:text-gray-700 transition duration-300 ">
    <span className="flex items-center border border-[#F6A619] text-black px-3 sm:px-4 py-2 rounded-lg">
      <img src={img1} alt="Games" className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
      Games
    </span>
  </Link>

  {/* Videos Button */}
  <Link to="/VideoSection" className="hidden sm:flex items-center space-x-2 text-black hover:text-gray-700 transition duration-300">
    <span className="flex items-center border border-[#F6A619] text-black px-3 sm:px-4 py-2 rounded-lg">
      <img src={img2} alt="Videos" className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
      Videos
    </span>
  </Link>

  {/* Sign In Button */}
  <Link to="/login" className="text-sm sm:text-base px-3 sm:px-9 py-2 rounded-md bg-[#F6A619] text-black hover:bg-[#e09316] transition duration-300">
    SIGN IN
  </Link>

  {/* Burger Menu Icon (visible on small screens) */}
  <button onClick={handleMenuClick} className="ml-2 sm:ml-4 text-black focus:outline-none">
    <svg className="w-6 h-6 flex flex-end" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </button>
</div>
        </div>
      </nav>

      {/* Side Modal (Sliding Drawer) */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={closeMenu}
          ></div>

          {/* Side Drawer */}
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transition-transform transform translate-x-0">
            <button onClick={closeMenu} className="p-4 text-black hover:bg-gray-200 focus:outline-none">
              {/* Close button inside the modal */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="px-6 py-4">
              <Link to="/" onClick={closeMenu} className="block text-black px-4 py-2 hover:bg-gray-100">Home</Link>
              <Link to="/about" onClick={closeMenu} className="block text-black px-4 py-2 hover:bg-gray-100">About Us</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
