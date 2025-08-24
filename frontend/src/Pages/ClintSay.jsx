import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import img from "../assets/c1.jpg";
import img1 from "../assets/c2.jpg";
import img2 from "../assets/c3.jpg";

function ClintSay() {
  const testimonials = [
    {
      name: "Michael - Technical Manager",
      company: "Marketing @ APPLE INC.",
      text: "I had the pleasure of working with Lily on a critical web development project, and I can confidently say that their expertise and professionalism exceeded my expectations.",
      image: img,
    },
    {
      name: "Sarah - Product Designer",
      company: "UI/UX @ GOOGLE",
      text: "Working with Lily was an absolute delight! The attention to detail and creative approach helped us bring our vision to life beautifully.",
      image: img1,
    },
    {
      name: "David - CEO",
      company: "Founder @ MICROSOFT PARTNERS",
      text: "The dedication and skill set Lily brought to the project were truly remarkable. We achieved results beyond our expectations.",
      image: img2,
    },
  ];

  const [selected, setSelected] = useState(testimonials[0]);

  return (
    <section
      id="ClintSay"
      className="w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
        
        <div className="max-w-3xl">
          <h3 className="text-4xl pb-3 sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            What Clients Say
          </h3>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Hear directly from my amazing clients about how we created digital
            experiences that deliver{" "}
            <span className="text-pink-400 font-semibold">impact</span> and{" "}
            <span className="text-purple-400 font-semibold">value</span>.
          </p>
        </div>


        <div className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-12 w-full">

          <div className="lg:w-1/2 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-xl transition-all duration-500 min-h-[280px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-gray-300 leading-relaxed text-lg">“{selected.text}”</p>
                <div className="mt-6">
                  <h4 className="text-lg font-bold">{selected.name}</h4>
                  <p className="text-gray-400">{selected.company}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center lg:justify-start gap-4 mt-8">
              {testimonials.map((t, i) => (
                <img
                  key={i}
                  onClick={() => setSelected(t)}
                  src={t.image}
                  alt={t.name}
                  className={`w-14 h-14 rounded-full cursor-pointer object-cover transition-all duration-300 ${
                    selected.image === t.image
                      ? "ring-4 ring-pink-500 scale-110"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <motion.img
              key={selected.image}
              src={selected.image}
              alt={selected.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-72 h-72 lg:w-80 lg:h-80 rounded-2xl object-cover shadow-2xl ring-4 ring-purple-500/40"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClintSay;
