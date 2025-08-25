import React from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Clint from "./Pages/Clint";
import Skill from "./Pages/Skill";
import Project from "./Pages/Project";
import ClintSay from "./Pages/ClintSay";


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="">
        <Home />
        <Clint />
        <Skill />
        <Project />
        <ClintSay />
        
        
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
