import React, { useState } from "react";
import img4 from "../../images/Registration/Confett.png"; // Confetti near text
import img6 from "../../images/Registration/Email.png"; // Email icon
import img7 from "../../images/Registration/imageGo.png"; // "Let's Go" mascot at the bottom-right
import img8 from "../../images/Registration/Lock.png"; // Password icon
import img9 from "../../images/Registration/Name.png"; // Name icon
import img10 from "../../images/Registration/parachute.png"; // Parachute icon
import img11 from "../../images/Registration/Pencil.png"; // Pencil icon for Username
import img13 from "../../images/Registration/rec.png"; // Curve image
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation (only check if empty)
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) {
      toast.error('Please check all required fields', {
        className: "error-toast",
      });
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/auth/register`;

    const data = { 
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    try {
      const response = await axios.post(url, data);
      toast.success('Registration successful! Please login.', {
        className: "success-toast",
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      // Handle specific error cases
      if (error.response) {
        const errorMessage = error.response.data.message || 'Registration failed. Please try again.';
        toast.error(errorMessage, {
          className: "error-toast",
        });
      } else {
        toast.error('Network error. Please check your connection.', {
          className: "error-toast",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[91vh] p-4 sm:p-8 bg-[#ebcea8] bg-opacity-80">
      <div className="relative w-full max-w-[900px] h-full md:h-[600px] rounded-lg p-6 flex flex-col md:flex-row bg-[#fdddb1] bg-opacity-80">
        {/* Background Curve */}
        <img
          src={img13}
          alt="Curve"
          className="absolute top-0 left-0 h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[63.3vh] w-full sm:w-[50vw] md:w-[63vh] lg:w-[55vh] opacity-70 z-0"

        />

        {/* Left Section */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center text-center p-4 sm:p-10 h-full">
          <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-black mt-8 md:mt-7">
            Join the fun! 🎉
          </div>
          <p className="text-gray-800 mt-12 leading-5 sm:leading-6 text-sm sm:text-base md:text-lg px-4">
            You're almost there! Sign up for a FREE Early Learners Hub account
            and explore a world where learning meets play. With fun games and
            activities, your child will enjoy an engaging journey of growth and
            development. Don’t miss out—join today!
          </p>

          {/* Background Images */}
          {/* <img
            src={img}
            alt="Clouds and birds"
            className="absolute top-0 left-0 w-[60%] sm:w-[50%] opacity-80 mt-4"
          /> */}
          {/* <img
            src={img3}
            alt="Rocket Mascot"
            className="absolute left-0 bottom-0 w-[20%] sm:w-[30%] mb-[-1rem] md:mb-[-2rem]"
          /> */}
          <img
            src={img4}
            alt="Confetti"
            className="absolute top-24 left-[60%] w-[15%] sm:w-[20%] md:w-[25%]"
          />
          {/* <img
            src={img12}
            alt="Sunset Clouds"
            className="absolute bottom-0 left-[15%] md:left-[55%] w-[50%] sm:w-[60%] opacity-80 mb-[-1rem] sm:mb-[-2rem] md:mb-[-2rem]"
          /> */}
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center p-4 sm:p-8  md:border-t-0  rounded-r-lg">
          <form 
            onSubmit={handleSubmit} 
            className="space-y-4 sm:space-y-6 w-full max-w-[250px] sm:max-w-[300px] md:max-w-[320px] relative z-10">
            <div className="relative flex flex-col">
              <div className="relative flex items-center bg-white p-2 sm:p-3 rounded-3xl shadow-lg border border-[#EB9721]">
                <img src={img9} alt="Name Icon" className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Name*"
                  className="w-full bg-transparent outline-none text-gray-700 pl-4 text-sm sm:text-base"
                />
              </div>
              {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
            </div>

            <div className="relative flex flex-col">
              <div className="relative flex items-center bg-white p-2 sm:p-3 rounded-3xl shadow-lg border border-[#EB9721]">
                <img src={img6} alt="Email Icon" className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email*"
                  className="w-full bg-transparent outline-none text-gray-700 pl-4 text-sm sm:text-base"
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
            </div>

            <div className="relative flex flex-col">
              <div className="relative flex items-center bg-white p-2 sm:p-3 rounded-3xl shadow-lg border border-[#EB9721]">
                <img src={img11} alt="Pencil Icon" className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password*"
                  className="w-full bg-transparent outline-none text-gray-700 pl-4 text-sm sm:text-base"
                />
              </div>
              {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
            </div>

            <div className="relative flex flex-col">
              <div className="relative flex items-center bg-white p-2 sm:p-3 rounded-3xl shadow-lg border border-[#EB9721]">
                <img src={img8} alt="Password Icon" className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password*"
                  className="w-full bg-transparent outline-none text-gray-700 pl-4 text-sm sm:text-base"
                />
              </div>
              {errors.confirmPassword && <span className="text-red-500 text-xs mt-1">{errors.confirmPassword}</span>}
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-[#F9AF47] text-black py-2 px-6 sm:px-8 md:px-10 font-medium text-sm sm:text-base md:text-lg rounded-3xl shadow-md"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Right-side Images */}
          <img
            src={img10}
            alt="Parachute"
            className="absolute top-0 right-4 w-[20%] sm:w-[25%] md:w-[25%]"
          />
          <img
            src={img7}
            alt="Let's Go Mascot"
            className="absolute bottom-0 right-4 w-[20%] sm:w-[25%] md:w-[30%]"
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Register;
