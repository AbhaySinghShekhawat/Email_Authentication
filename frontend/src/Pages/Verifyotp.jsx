import React, { useState, useContext } from "react";
import { MainContext } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const VerifyOtp = () => {
  const { SERVER_URL, notify } = useContext(MainContext);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : ""
  );
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!otp) return notify("Please enter OTP", false);

    setLoading(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/user/verify`,
        { otp },
        { withCredentials: true }
      );

      if (response.data.status === 1) {
        notify("Account verified successfully! ✅", true);
        if (response.data.token && response.data.user) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        navigate("/");
      } else {
        notify(response.data.msg, false);
      }
    } catch (err) {
      console.error(err);
      notify("Failed to verify OTP", false);
    } finally {
      setLoading(false);
    }
  };

  const resendOtpHandler = async () => {
    setResendLoading(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/user/resend-otp`,
        { email },
        { withCredentials: true }
      );

      if (response.data.status === 1) {
        notify("OTP resent to your email 📩", true);
      } else {
        notify(response.data.msg, false);
      }
    } catch (err) {
      console.error(err);
      notify("Failed to resend OTP", false);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="bg-gray-800/70 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl w-full max-w-md shadow-[0_0_20px_rgba(59,130,246,0.4)]">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Verify Your Account
        </h2>

        <p className="text-center text-gray-400 mt-3">
          Enter the OTP sent to <span className="text-blue-400 font-semibold">{email}</span>
        </p>

        <form onSubmit={submitHandler} className="mt-6 space-y-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full p-4 rounded-xl bg-gray-900/70 border border-gray-700 placeholder-gray-500 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-xl font-semibold text-white shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Didn't receive OTP?{" "}
          <span
            onClick={resendOtpHandler}
            className="text-blue-400 cursor-pointer hover:underline hover:text-purple-400 transition inline-flex items-center gap-2"
          >
            {resendLoading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin text-sm" />
                Resending...
              </>
            ) : (
              "Resend OTP"
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
