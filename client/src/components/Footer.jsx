import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import { BiLogoGmail } from "react-icons/bi";
import { MdOutlineFacebook } from "react-icons/md";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className='w-full flex flex-col bg-[#D9D9D9]'>
      <div className='w-full flex flex-col lg:flex-row gap-5 p-5'>
        {/* Left Section: Logo and Address */}
        <div className='w-full lg:w-1/3 flex flex-col gap-2 p-2'>
          <div className='flex gap-5 mt-6 justify-center lg:justify-start'>
            <FaLocationDot className='text-3xl lg:text-4xl' style={{ color: '#000000', border: '2px solid #EB9721', borderRadius: '50%' }} />
            <p className='text-[.7rem] lg:text-[.9rem] text-center lg:text-left font-poppins'>
              Unit 1 - Bajarias' Commercial Space, Cambangyao Dalaguete, near Gerboy's Residence Dalaguete,
              Philippines, 6022 
            </p>
          </div>
        </div>

        {/* Middle Section: Useful Links */}
        <div className='w-full lg:w-1/2 flex flex-col justify-center items-center'>
          <p className='font-bold text-center lg:text-left text-lg lg:text-xl'>About E-Learners</p>
          <div className='flex flex-col gap-3 items-center lg:items-start mt-3'>
            <Link to="#" className='text-sm lg:text-base'>Our Team</Link> 
            <p className='text-sm lg:text-base'>About Us</p > 
            <Link to="/Faqs" className='text-sm lg:text-base'>FAQ's</Link>
          </div>
        </div>

        {/* Right Section: Contact Info */}
        <div className='w-full lg:w-1/3 flex flex-col gap-4 justify-center pt-5 lg:pt-14 px-5'>
          <p className='font-bold text-center lg:text-left text-lg lg:text-xl'>Contact Us</p>
          <div className='flex gap-3 justify-center lg:justify-start items-center'>
            <PiPhoneCallFill className='text-3xl lg:text-4xl' style={{ color: '#000000', border: '2px solid #EB9721', borderRadius: '70%' }} />
            <div className='text-[.8rem] lg:text-[.9rem] font-normal font-poppins'>
              <p>+63 929 093 5005</p>
              <p>+63 960 670 2035</p>
            </div>
          </div>
          <div className='flex gap-3 justify-center lg:justify-start items-center'>
            <BiLogoGmail className='text-3xl lg:text-4xl' style={{ color: '#000000', border: '2px solid #EB9721', borderRadius: '70%' }} />
            <p className='text-[.8rem] lg:text-[.9rem] font-poppins'>learninglanehub07@gmail.com</p>
          </div>
          <div className='flex gap-3 justify-center lg:justify-start items-center'>
            <MdOutlineFacebook className='text-3xl lg:text-4xl' style={{ border: '2px solid #EB9721', borderRadius: '50%' }} />
            <p className='text-[.8rem] lg:text-[.9rem] font-poppins'>LearningLane Hub Tutorial Services</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className='w-full h-[3rem] bg-[#EB9721] flex justify-center lg:justify-end items-center px-3'>
        <p className='text-center lg:text-right text-xs lg:text-sm'>
          Copyright©2024 Early Learners Hub. All Rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
