import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-[#0f0f0f] p-6 sm:p-10 rounded-2xl sm:rounded-3xl xs:w-[320px] w-full border border-white/5"
  >
    <p className="text-white font-black text-[36px] sm:text-[48px]">"</p>

    <div className="mt-1">
      <p className="text-white tracking-wider text-[15px] sm:text-[18px] leading-relaxed">{testimonial}</p>

      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[15px] sm:text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[11px] sm:text-[12px]">
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
      <div className={`mt-8 sm:mt-12 bg-[#0a0c14] rounded-[20px] overflow-hidden`}>
        <div
          className={` bg-[#111522] rounded-2xl ${styles.padding} min-h-[220px] sm:min-h-[300px]`}
        >
          <motion.div variants={textVariant()}>
            <p className={`text-[#8ec5ff] ${styles.sectionSubText}`}>
              What others say
            </p>
            <h2 className={styles.sectionHeadText}>Testimonials.</h2>
          </motion.div>
        </div>
        <div className={`-mt-14 sm:-mt-20 pb-10 sm:pb-14 ${styles.paddingX} flex flex-wrap gap-5 sm:gap-7`}>
          {testimonials.map((testimonial, index) => (
            <FeedbackCard
              key={testimonial.name}
              index={index}
              {...testimonial}
            />
          ))}
        </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "testimonials");
