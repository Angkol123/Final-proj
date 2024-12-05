import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Image imports
import img6 from "../../images/LogIn/Pencil.png"; // Pencil for Email
import img8 from "../../images/LogIn/Lock.png"; // Lock icon for Password
import img10 from "../../images/LogIn/cute.png"; // Parachute icon
import img13 from "../../images/LogIn/rt.png"; // Curve background

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    const data = { email, password };

    try {
        const response = await axios.post(url, data);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("name", response.data.name);
        toast.success("Login successful!", { className: "success-toast" });
        navigate("/admin");
    } catch (error) {
        console.log('Login error:', error); // For debugging
        
        if (error.response) {
            // Server responded with an error
            const errorMessage = error.response.data.message || "Login failed. Please check your credentials.";
            toast.error(errorMessage, {
                className: "error-toast",
            });
        } else if (error.request) {
            // Request was made but no response received
            toast.error("Unable to connect to the server. Please try again later.", {
                className: "error-toast",
            });
        } else {
            // Something else went wrong
            toast.error("An unexpected error occurred. Please try again.", {
                className: "error-toast",
            });
        }
    }
  };
  // bg-[#fdddb1]
  return (
    <div className="flex justify-center items-center h-[91vh] p-4 sm:p-8 bg-opacity-80 bg-[#ebcea8]">

      <div className="relative w-full max-w-[900px] h-full md:h-[600px] rounded-lg p-6 flex flex-col md:flex-row bg-opacity-80 bg-[#fdddb1]">
        <img
          src={img13}
          alt="Curve"
          className="absolute top-0 right-0  md:h-[74vh] w-[35vh] md:w-[66vh] opacity-90 z-0"
        />

        {/* Left Section */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center text-center p-4 sm:p-8 h-full">
          <img
            src={img10}
            alt="Parachute"
            className="absolute top-0 left-0 w-[20%] sm:w-[30%] md:w-[25%]"
          />
          <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-black mt-12 ml-6">
            Welcome Back!
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6 relative z-10 flex flex-col items-center mt-[4rem] sm:mt-[9vh] gap-3 sm:gap-5"
          >
            <div className="relative flex items-center bg-white p-2 sm:p-3 rounded-3xl shadow-lg w-full max-w-[250px] sm:max-w-[300px] border-[#EB9721] border">
              <img src={img6} alt="Email Icon" className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email*"
                className="w-full bg-transparent outline-none text-gray-700 pl-3 sm:pl-4 text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="relative flex items-center bg-white p-2 sm:p-3 rounded-3xl shadow-lg w-full max-w-[250px] sm:max-w-[300px] border-[#EB9721] border">
                <img
                  src={img8}
                  alt="Password Icon"
                  className="w-4 sm:w-5 h-4 sm:h-5 ml-2"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password*"
                  className="w-full bg-transparent outline-none text-gray-700 pl-3 sm:pl-4 text-sm sm:text-base"
                />
              </div>
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </a>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="text-black py-1 sm:py-2 px-6 font-medium text-sm sm:text-base md:text-lg rounded-3xl bg-[#F9AF47] border border-[#ECA23B] shadow-lg w-[100%] sm:w-[100%] md:w-[150px] md:h-[10]"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 relative rounded-r-lg p-4 sm:p-8 flex flex-col justify-center">
          <div className="font-semibold text-lg sm:text-xl md:text-2xl">
            Don’t have an account?
          </div>
          <p className="text-black mt-4 leading-5 sm:leading-6 text-sm sm:text-base md:text-lg">
            Sign in to your account to unlock more fun, interactive learning,
            and keep track of your child's growth and development!
          </p>
          <div className="text-center mt-12 sm:mt-16">
            <button
              className="text-black py-1 sm:py-2 px-6 font-medium text-sm sm:text-base md:text-lg rounded-3xl border border-[#F49713] shadow-lg w-[70%] sm:w-[60%] md:w-[50%]"
              onClick={() => navigate("/register")}
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default SignIn;
