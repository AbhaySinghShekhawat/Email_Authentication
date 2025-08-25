import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const MainContext = createContext();

function MainProvider({ children }) {
  const SERVER_URL = "https://email-authentication-1.onrender.com";
  
  const notify = (message, status) => {
    const toastType = status ? "success" : "error";
    toast(message, { type: toastType });
  };
  
  const [userData, setuserData] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true);

  
  const handleCurrentUser = async () => {
  if (!userData?.id) {
    setLoading(false);
    return;
  }
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/user/current-user/${userData.id}`,
      { withCredentials: true }
    );

    if (response.data.status === 1) {
      setuserData(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } else {
      setuserData(null);
      localStorage.removeItem("user");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    setuserData(null);
    localStorage.removeItem("user");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    handleCurrentUser();
  }, []);

  return (
    <MainContext.Provider
      value={{
        SERVER_URL,
        notify,
        userData,
        setuserData,
        loading,
      }}
    >
      {children}
      <ToastContainer position="top-right" autoClose={1000} theme="light" />
    </MainContext.Provider>
  );
}

export default MainProvider;
