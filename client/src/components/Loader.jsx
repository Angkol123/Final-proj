import React from 'react';
import logo from "../images/footer/logo.png";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
  {/* Wrapper to align logo and rotating circle */}
  <div className="relative flex items-center justify-center">
    {/* Logo with background color */}
    <div className="logo-background h-[85px] w-[85px] flex items-center justify-center rounded-full bg-[#EBCEA8] z-10">
      <img src={logo} alt="Loading..." className="h-[65px] w-[65px]" />
    </div>

    {/* Rotating Circle around the logo */}
    <div className="rotating-circle absolute h-[95px] w-[95px] border-4 border-t-4 rounded-full"></div>
  </div>

  <style jsx>{`
    .rotating-circle {
      border-top-color: #EB9721;
      animation: spinner 1.5s linear infinite;
    }

    @keyframes spinner {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    } 
  `}</style>
</div>
  
  

  );
};

export default Loader;
