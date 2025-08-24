import React from "react";
import { FaHtml5 } from "react-icons/fa";
import { HiMiniFingerPrint } from "react-icons/hi2";
import { FaCode } from "react-icons/fa";

function Skill() {
  const skills = [
    {
      icon: <FaHtml5 size={36} className="text-orange-500" />,
      title: "Frontend Web Development",
      description:
        "Creating beautiful and functional web experiences using modern tools and best practices.",
    },
    {
      icon: <HiMiniFingerPrint size={36} className="text-pink-500" />,
      title: "Mobile App Development",
      description:
        "Building seamless mobile apps for iOS & Android with smooth UI and performance.",
    },
    {
      icon: <FaCode size={36} className="text-green-500" />,
      title: "Backend Development",
      description:
        "Developing scalable APIs and secure server-side systems for modern applications.",
    },
  ];

  return (
    <section
      id="Skill"
      className="w-full px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-24"
    >
      <div className="flex flex-col items-center justify-center gap-12">
        
        <div className="text-center max-w-3xl">
          <h3 className="text-3xl pb-3 sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
            My Skills
          </h3>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            I design and build digital solutions that blend{" "}
            <span className="text-pink-400 font-semibold">creativity</span> with{" "}
            <span className="text-purple-400 font-semibold">functionality</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl hover:border-pink-500/60 hover:shadow-pink-500/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-zinc-700 rounded-full">
                {skill.icon}
              </div>
              <h4 className="mt-4 text-lg sm:text-xl font-semibold">
                {skill.title}
              </h4>
              <p className="mt-2 text-sm sm:text-base text-gray-400 leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skill;
