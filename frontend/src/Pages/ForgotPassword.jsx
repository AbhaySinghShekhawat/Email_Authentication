import React, { useState, useContext } from "react";
import { MainContext } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ForgotPassword = () => {
  const { SERVER_URL, notify } = useContext(MainContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) return notify("Please enter your email", false);

    setLoading(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/user/forget-password`,
        { email },
        { withCredentials: true }
      );

      if (response.data.status === 1) {
        notify(response.data.msg, true);
        localStorage.setItem("resetEmail", email);
        navigate("/verify-reset-otp");
      } else {
        notify(response.data.msg, false);
      }
    } catch (err) {
      console.error(err);
      notify("Failed to send OTP", false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-purple-600/30 rounded-full top-16 left-10 blur-3xl"></div>
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full bottom-16 right-10 blur-3xl"></div>

      <form
        onSubmit={submitHandler}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Forgot Password
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl font-semibold text-white shadow-lg transition bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 flex items-center justify-center"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 text-white" />
          ) : (
            "Send OTP"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
