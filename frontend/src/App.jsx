
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import VerifyResetOtp from "./Pages/VerifyResetOtp";
import VerifyOtp from "./Pages/VerifyOtp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
  },
  {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "verify-reset-otp",
        element: <VerifyResetOtp />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
