import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import lock from "../../images/LogIn/locky.png"
import arow from "../../images/games/arow.png"

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, { email });
            toast.success("OTP sent to your email!");
            setStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
                email,
                otp,
                newPassword,
            });
            toast.success("Password reset successful!");
            // Redirect to login
            window.location.href = "/login";
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        }
    };

    return (
        <div className="min-h-[91vh] flex items-center justify-center bg-[#ebcea8] px-4 sm:px-6 lg:px-8 font-['Poppins']">
            <img
                src={arow}
                alt="Back to Login"
                onClick={() => navigate('/login')}
                className="absolute left-0 lg:mt-[1rem] top-14 sm:top-16 md:top-20 cursor-pointer w-24 sm:w-32 md:w-36 lg:w-40 h-auto z-20 hover:scale-105 transition-transform"
            />
            <div className="max-w-md w-full space-y-8 bg-[#FDDDB1] rounded-3xl p-10">
                <div className="text-center flex flex-col items-center justify-center">
                    <img src={lock} alt="lock" className="w-[25%] h-[10vh] bg-[#FFD195] rounded-full p-3" />
                    <h2 className="mt-6 text-2xl font-semibold text-gray-900">
                        Forgot your Password?
                    </h2>
                </div>
                {step === 1 ? (
                    <form onSubmit={handleSendOTP} className="mt-8 space-y-6">
                        <label htmlFor="email" className="text-sm font-medium text-gray-900">Enter your email to reset your password</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[#EB9721] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#EB9721] focus:border-[#EB9721] focus:z-10 sm:text-sm"
                        />
                        <button
                            type="submit"
                            className="mx-auto group relative w-[50%] flex justify-center py-2 px-4 border border-[#EB9721] text-sm font-medium rounded-lg text-black bg-[#F9AF47] hover:bg-[#EB9721] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB9721] transition-colors duration-200"
                        >
                            Send OTP
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
                        <input
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[#EB9721] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#EB9721] focus:border-[#EB9721] focus:z-10 sm:text-sm"
                        />
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[#EB9721] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#EB9721] focus:border-[#EB9721] focus:z-10 sm:text-sm"
                        />
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-[#EB9721] text-sm font-medium rounded-lg text-black bg-[#F9AF47] hover:bg-[#EB9721] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB9721] transition-colors duration-200"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
