import React, { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../Context";
import axios from "axios";

const Signup = () => {
  const { SERVER_URL, notify, setuserData } = useContext(MainContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.passwordConfirm.value) {
      notify("Passwords do not match", false);
      return;
    }

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      passwordConfirm: e.target.passwordConfirm.value,
    };

    try {
      setLoading(true);
      // const response = await axios.post(`${SERVER_URL}/api/user/signup`, data, {
      //   withCredentials: true,
      // });
      const response = await axios.post(`${SERVER_URL}/api/user/signup`, data,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      
      

      if (response.data.status === 1) {
        const { user, token } = response.data;
        setuserData(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        notify(response.data.message, true);
        navigate("/verify-otp");
      } else {
        setuserData(null);
        notify(response.data.message, false);
      }
    } catch (error) {
      notify("Signup failed", false);
      
    } finally {
      setLoading(false);
    }

    e.target.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-purple-600/30 rounded-full top-10 left-10 blur-3xl"></div>
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full bottom-10 right-10 blur-3xl"></div>

      <form
        onSubmit={submitHandler}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Create Account
        </h2>

        <div className="space-y-5">
          <input
            name="username"
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              required
              className="w-full p-3 pr-10 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              name="passwordConfirm"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              className="w-full p-3 pr-10 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="text-sm text-center text-gray-300 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="ml-2 text-blue-400 hover:text-purple-400 font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
