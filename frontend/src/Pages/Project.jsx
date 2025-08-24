import React from "react";
import img from "../assets/p1.svg";
import img1 from "../assets/p2.svg";
import img2 from "../assets/p3.svg";
import img3 from "../assets/p4.svg";
import img4 from "../assets/p5.svg";
import img5 from "../assets/p6.svg";
import img6 from "../assets/p7.svg";
import img7 from "../assets/p8.svg";

function Project() {
  const projects = [
    {
      img: img,
      title: "Frontend Web Development",
      description:
        "Creating beautiful and functional web experiences using the latest technologies and best practices.",
    },
    {
      img: img1,
      title: "Mobile App Development",
      description:
        "Responsive and intuitive mobile apps that work seamlessly across iOS & Android devices.",
    },
    {
      img: img2,
      title: "Backend Development",
      description:
        "Robust and scalable server-side applications and APIs to power frontend systems securely.",
    },
    {
      img: img3,
      title: "E-commerce Development",
      description:
        "Modern e-commerce solutions with smooth checkout and user-friendly interfaces.",
    },
    {
      img: img4,
      title: "Custom Web Apps",
      description:
        "Tailored web applications built to match unique business requirements.",
    },
    {
      img: img5,
      title: "API Development",
      description:
        "Secure and efficient APIs that ensure smooth communication between platforms.",
    },
    {
      img: img6,
      title: "Cross-Platform Apps",
      description:
        "Applications that work flawlessly across devices for a consistent experience.",
    },
    {
      img: img7,
      title: "Business Websites",
      description:
        "Professional and modern websites that elevate brands and engage customers.",
    },
  ];

  return (
    <section
      id="Project"
      className="w-full px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-24"
    >
      <div className="flex flex-col items-center justify-center gap-12">
        
        <div className="text-center max-w-3xl">
          <h3 className="text-3xl pb-3 sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
            My Projects
          </h3>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From web apps to mobile solutions, explore the projects where{" "}
            <span className="text-pink-400 font-semibold">creativity</span> meets{" "}
            <span className="text-purple-400 font-semibold">functionality</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-7xl">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-pink-500/60 shadow-xl hover:shadow-pink-500/10
               hover:-translate-y-2 transition-all duration-300 group"
            >

              <div className="absolute inset-0 rounded-xl border border-transparent transition-all duration-500"></div>

              <div className="w-24 h-24 flex items-center justify-center bg-zinc-700 rounded-full z-10">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <h4 className="mt-4 text-lg sm:text-xl font-semibold z-10">
                {project.title}
              </h4>
              <p className="mt-2 text-sm sm:text-base text-gray-400 leading-relaxed z-10">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;
