import React, { useState, useContext } from "react";
import { MainContext } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ResetPassword = () => {
  const { SERVER_URL, notify } = useContext(MainContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("resetEmail");
  const otp = localStorage.getItem("verifiedOtp");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!password || !passwordConfirm)
      return notify("Enter new password", false);
    if (password !== passwordConfirm)
      return notify("Passwords do not match", false);

    setLoading(true);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/user/reset-password`,
        { email, otp, password, passwordConfirm },
        { withCredentials: true }
      );

      if (response.data.status === 1) {
        notify("Password reset successful ✅", true);
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("verifiedOtp");
        navigate("/login");
      } else {
        notify(response.data.msg || "Failed to reset password", false);
      }
      if (!email || !otp) {
        notify("Please verify OTP first", false);
        navigate("/forgot-password");
      }
    } catch (err) {
      console.error(err);
      notify("Failed to reset password", false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <form
        onSubmit={submitHandler}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-full max-w-md shadow-2xl space-y-6 transition-all duration-300 hover:shadow-blue-500/30"
      >
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-600/20 rounded-full shadow-inner">
              <FiLock className="text-blue-400 text-3xl" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Reset Password
          </h2>
          <p className="text-gray-300 text-sm">
            For <span className="font-semibold text-blue-400">{email}</span>
          </p>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-full p-3 rounded-xl bg-gray-800/70 placeholder-gray-400 text-white outline-none pr-10 border border-white/10 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showPasswordConfirm ? "text" : "password"}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm Password"
            className="w-full p-3 rounded-xl bg-gray-800/70 placeholder-gray-400 text-white outline-none pr-10 border border-white/10 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400"
          >
            {showPasswordConfirm ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
          ) : (
            "Save Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
