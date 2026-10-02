import { motion } from "framer-motion";
import React from "react";
import { RiBriefcase4Fill } from "react-icons/ri";
import { Tilt } from "react-tilt";
import { SectionWrapper } from "../hoc";
import useMagnetic from "../reactbits/hooks/useMagnetic";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[255px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-[#111522] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const { ref: resumeButtonRef, style: magneticStyle } = useMagnetic({
    radius: 100,
    strength: 0.3,
  });

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[15px] sm:text-[17px] max-w-3xl leading-[28px] sm:leading-[32px]"
      >
        I'm Jayant Sunil Potdar, a Full Stack Developer passionate about turning
        ambitious ideas into polished, high-performance web applications. I
        specialize in modern frontend engineering, Three.js 3D interactions, and
        scalable backend architectures. Let's work together to build something
        extraordinary!
      </motion.p>
      <button
        ref={resumeButtonRef}
        style={magneticStyle}
        className="mt-8 sm:mt-10 px-6 py-3.5 text-white bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 rounded-xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
        onClick={() =>
          window.open(
            "https://drive.google.com/file/d/1qRPD6T3OghlApROzIfoT0FPg4S9QgptL/view?usp=sharing",
            "_blank",
          )
        }
      >
        <span className="font-semibold flex gap-2 items-center text-sm sm:text-base">
          <RiBriefcase4Fill size={18} />
          Download Resume
        </span>
      </button>
    </>
  );
};

export default SectionWrapper(About, "about");
