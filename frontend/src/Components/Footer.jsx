import React from "react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-300 pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,0,128,0.08),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 z-10">
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
              LuxBrand
            </span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Experience premium quality and modern luxury with our services.
            Designed to bring comfort, trust, and innovation.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-pink-500 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {["Home", "Clint", "Project", "ClintSay"].map((item, i) => (
              <li key={i}>
                <a
                  href={`#${item}`}
                  className="hover:text-pink-400 transition duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-pink-500 inline-block pb-1">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FiMapPin className="text-pink-400 text-lg" />
              123 Luxury Street, Jaipur, India
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="text-pink-400 text-lg" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="text-pink-400 text-lg" /> support@luxbrand.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-pink-500 inline-block pb-1">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-2xl">
            {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-pink-400 transition transform hover:scale-110"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-12 border-t border-gray-700 pt-4 text-center text-sm text-gray-400 z-10">
        © {new Date().getFullYear()}{" "}
        <span className="text-pink-400 font-semibold">LuxBrand</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
