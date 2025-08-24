import React, { useState, useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../Context";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {
  const { SERVER_URL, notify, setuserData } = useContext(MainContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) return notify("Please enter email and password", false);

    setLoading(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.status === 1) {
        const { user, token } = response.data;
        setuserData(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        notify("Login successful", true);
        navigate("/");
      } else {
        notify(response.data.msg, false);
      }
    } catch (err) {
      console.error(err);
      notify("Login failed", false);
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
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Welcome Back
        </h2>

        <div className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:opacity-90 transition flex items-center justify-center"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 text-white" />
            ) : (
              "Login"
            )}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between items-center text-sm text-gray-300 mt-6 gap-3">
          <Link to="/forgot-password" className="hover:text-blue-400 transition">
            Forgot Password?
          </Link>
          <p>
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-purple-400 font-medium transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
