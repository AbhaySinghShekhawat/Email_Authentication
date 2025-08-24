import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", id: "Home" },
  { name: "Clint", id: "Clint" },
  { name: "Skill", id: "Skill" },
  { name: "Project", id: "Project" },
  { name: "ClintSay", id: "ClintSay" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop - 100;
          const bottom = top + section.offsetHeight;
          if (window.scrollY >= top && window.scrollY < bottom) {
            setActive(item.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-b from-gray-900/70 via-gray-800/60 to-gray-900/70 backdrop-blur-lg shadow-xl"
          : "bg-gradient-to-b from-gray-900/30 via-gray-800/20 to-gray-900/30 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <a
          href="#Home"
          className="text-3xl md:text-4xl font-extrabold text-white tracking-wider hover:scale-105 transform transition-all duration-300"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400">
            LuxBrand
          </span>
        </a>

        <nav className="hidden md:flex space-x-10 items-center">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative font-semibold transition duration-300 ${
                active === item.id
                  ? "text-pink-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {item.name}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500 origin-left ${
                  active === item.id ? "w-full scale-x-100" : "w-0 scale-x-0"
                }`}
              ></span>
            </a>
          ))}

          <button
            onClick={handleLogout}
            className="ml-6 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:shadow-2xl hover:opacity-90 transition-all duration-300"
          >
            Logout
          </button>
        </nav>

        <button
          className="md:hidden text-white text-3xl p-2 hover:bg-white/10 rounded-full transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-gradient-to-b from-gray-900/70 via-gray-800/60 to-gray-900/70 backdrop-blur-lg px-6 py-6 space-y-5 shadow-2xl rounded-b-3xl transition-all duration-500">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={`block font-medium text-lg py-2 transition-all duration-300 ${
                active === item.id
                  ? "text-pink-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {item.name}
            </a>
          ))}

          <button
            onClick={handleLogout}
            className="w-full block text-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:shadow-2xl hover:opacity-90 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
