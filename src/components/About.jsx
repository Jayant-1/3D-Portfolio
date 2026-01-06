import { motion } from "framer-motion";
import React from "react";
import { RiBriefcase4Fill } from "react-icons/ri";
import { Tilt } from "react-tilt";
import { services } from "../constants";
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
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a Jayant Sunil Potdar. A Full Stack Web developer with experience in
        HTML, CSS, and JavaScript, and expertise in frameworks like React, and
        Bootstrap. I'm a quick learner and to create efficient, scalable, and
        user-friendly solutions that solve real-world problems. Let's work
        together to bring our ideas to life!
      </motion.p>
      <button
        ref={resumeButtonRef}
        style={magneticStyle}
        className="mt-10 px-6 py-3 text-white bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-md shadow-md hover:bg-gradient-to-r hover:from-cyan-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        onClick={() =>
          window.open(
            "https://drive.google.com/file/d/1JXxclNaQDOGD9BauEy1jS9XDYk5QsaMa/view?usp=sharing",
            "_blank"
          )
        }
      >
        <span className="font-semibold flex gap-1.5 items-center">
          <RiBriefcase4Fill />
          Download Resume
        </span>
      </button>
      <div className="mt-12 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
