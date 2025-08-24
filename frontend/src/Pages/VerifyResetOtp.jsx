import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../Context";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const VerifyResetOtp = () => {
  const { SERVER_URL, notify } = useContext(MainContext);
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("resetEmail");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!otp) return notify("Please enter OTP", false);
    if (!email) return notify("Email not found, please restart password reset", false);

    setLoading(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/user/verify-reset-otp`,
        { email, otp: otp.trim() },
        { withCredentials: true }
      );

      if (response.data.status === 1) {
        notify("OTP verified successfully ✅", true);
        localStorage.setItem("verifiedOtp", otp);
        navigate("/reset-password");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-purple-600/30 rounded-full top-20 left-10 blur-3xl"></div>
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full bottom-20 right-10 blur-3xl"></div>

      <form
        onSubmit={submitHandler}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Verify OTP
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the OTP sent to <span className="font-semibold text-white">{email}</span>
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>
      </form>
    </div>
  );
};

export default VerifyResetOtp;

