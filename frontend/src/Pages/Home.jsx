import React from "react";
import img from "../assets/img.svg";
import TiltedCard from "../Animation/TiltedCard.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

   useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <section
      id="Home"
      className="w-full mt-16 min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-6"
    >
      <div className="container mx-auto lg:px-12 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="flex flex-col gap-6 max-w-xl text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-white via-gray-200 to-zinc-400 bg-clip-text text-transparent">
              Welcome to my <span className="text-pink-500">Web Portfolio!</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              I'm <span className="font-semibold text-white">Lily Smith</span>, a
              passionate web developer based in the USA. Explore my projects
              where <span className="text-pink-400 font-semibold">creativity meets functionality.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <a
                href="#Project"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                View Projects
              </a>
            </div>
          </div>

          <div className="w-full lg:w-[600px] md:w-[400px] flex justify-center">
            <TiltedCard
              imageSrc={img}
              altText="Portfolio preview"
              captionText="My Work"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
