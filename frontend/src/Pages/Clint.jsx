import React from "react";
import img from "../assets/img1.svg";
import img1 from "../assets/img2.svg";
import img2 from "../assets/img3.svg";
import img3 from "../assets/img4.svg";
import img5 from "../assets/img6.svg";

function Clint() {
  const clients = [img, img1, img2, img3, img5];

  return (
    <section
      id="Clint"
      className="w-full pt-40 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-24"
    >
      <div className="flex flex-col items-center justify-center gap-12">
        
        <div className="text-center max-w-3xl">
          <h3 className="text-3xl pb-3 sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
            My Prestigious Clients
          </h3>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Trusted by world-class companies & brands that I’ve had the honor to collaborate with.  
            Excellence meets creativity in every partnership.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 items-center justify-items-center w-full max-w-7xl">
          {clients.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 hover:scale-110 transition-all duration-300"
            >
              <img
                src={logo}
                alt={`client logo ${index + 1}`}
                className="h-12 sm:h-16 md:h-20 grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clint;
