import { motion } from "framer-motion";
import React, { useState } from "react";
import { Tilt } from "react-tilt";

import { github } from "../assets";
import { projects, words } from "../constants";
import { SectionWrapper } from "../hoc";
import useCardIntent from "../reactbits/hooks/useCardIntent";
import useParallax from "../reactbits/hooks/useParallax";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import useMediaQuery from "../utils/useMediaQuery";
import ProjectModal from "./ProjectModal";

const ProjectCard = ({ index, name, image, source_code_link, onOpenModal }) => {
  const { hoverDepth, previewReady, handlers } = useCardIntent({
    id: `project-${index}`,
    hoverDelay: 200,
  });

  const isMobile = useMediaQuery("(max-width: 768px)");
  const { style: parallaxStyle } = useParallax({ enabled: !isMobile });

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="w-full lg:w-[calc(50%-20px)]"
    >
      <motion.div
        {...handlers}
        animate={{
          y: previewReady ? -6 - hoverDepth * 6 : 0,
          scale: 1 + hoverDepth * 0.012,
        }}
        transition={{
          duration: 0.28,
          type: "spring",
          stiffness: 230,
          damping: 24,
        }}
        className="relative h-[320px] rounded-xl overflow-hidden cursor-pointer group bg-[#0a0e17] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-400 shadow-[0_6px_24px_rgb(0,0,0,0.25)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.4)]"
        onClick={() => onOpenModal(previewReady)}
      >
        {/* Subtle Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/8 group-hover:bg-blue-500/40 transition-all duration-500"></div>

        {/* Project Number Badge - Premium Minimal */}
        <div className="absolute top-5 left-5 z-20 transition-all duration-400 group-hover:scale-110">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.05] backdrop-blur-lg border border-white/[0.12] group-hover:border-blue-500/50 group-hover:bg-white/[0.08] transition-all duration-400">
            <span className="text-white/80 font-semibold text-sm tracking-wider">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* GitHub Button - Premium Design */}
        <div className="absolute top-5 right-5 z-20">
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(source_code_link, "_blank");
            }}
            className="relative w-10 h-10 rounded-lg bg-white/[0.05] backdrop-blur-lg border border-white/[0.12] hover:border-blue-500/40 hover:bg-white/[0.08] flex items-center justify-center transition-all duration-400"
            aria-label="View source code"
          >
            <img
              src={github}
              alt="github"
              className="w-5 h-5 opacity-75 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.button>
        </div>

        {/* Main Image Section - Full Height */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.02]"
            style={{
              filter: "brightness(0.88) saturate(1.05) contrast(1.02)",
              ...parallaxStyle,
            }}
          />

          {/* Elegant Overlay */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-all duration-500"></div>

          {/* Right-side gradient for content readability */}
          <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-black/60 via-black/20 to-transparent"></div>
        </div>

        {/* Content Section - Premium Compact */}
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          {/* View Indicator - Subtle */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-2 opacity-0 group-hover:opacity-100 transition-all duration-400"
          >
            <div className="inline-flex items-center gap-1.5 text-xs text-blue-400/85 font-medium tracking-wide">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span>View Project</span>
            </div>
          </motion.div>

          {/* Project Title - Larger for prominence */}
          <h3 className="text-white font-bold text-lg leading-snug mb-2 tracking-tight group-hover:text-blue-50 transition-colors duration-400 line-clamp-2">
            {name}
          </h3>

          {/* Premium Underline Accent */}
          <div className="h-[1.5px] w-0 group-hover:w-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-600 ease-out"></div>
        </div>

        {/* Bottom Edge Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5 group-hover:bg-blue-500/25 transition-all duration-500"></div>

        {/* Premium Hover Glow - Subtle */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Works = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(-1);
  const [modalPreviewReady, setModalPreviewReady] = useState(false);

  const handleOpenModal = (project, previewReady = false) => {
    const index = projects.findIndex((p) => p.name === project.name);
    setCurrentProjectIndex(index);
    setSelectedProject(project);
    setModalPreviewReady(previewReady);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      setCurrentProjectIndex(-1);
      setModalPreviewReady(false);
    }, 300); // Clear after animation
  };

  const handleNavigateProject = (newIndex) => {
    if (newIndex >= 0 && newIndex < projects.length) {
      setCurrentProjectIndex(newIndex);
      setSelectedProject(projects[newIndex]);
    }
  };

  return (
    <>
      <div>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} `}>My work</p>
          <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
        </motion.div>
        <div className="hero-text">
          <motion.span
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 text-secondary text-[30px] max-w-3xl leading-[50px]"
          >
            <h1>
              Shaping
              <span className="slide pl-3">
                <span className="wrapper">
                  {words.map((word, index) => (
                    <span
                      key={index}
                      className="flex items-center text-3xl md:gap-3 gap-1 pb-2"
                    >
                      <img
                        src={word.imgPath}
                        alt="person"
                        className=" md:p-2 p-1 rounded-full bg-[#8ec5ff]"
                      />
                      <span
                        className="font-extrabold text-white"
                        style={{
                          fontFamily: word.font,
                          textShadow: "0 0 4px #8ec5ff, 0 0 6px white",
                        }}
                      >
                        {word.text}
                      </span>
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <h1>into Real Projects that Deliver Results</h1>
          </motion.span>
        </div>

        <div className="mt-20 flex flex-wrap gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              index={index}
              {...project}
              onOpenModal={(previewReady) =>
                handleOpenModal(project, previewReady)
              }
            />
          ))}
        </div>
      </div>

      {/* Project Modal with Navigation */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projects={projects}
        currentIndex={currentProjectIndex}
        onNavigate={handleNavigateProject}
        previewReady={modalPreviewReady}
      />
    </>
  );
};

export default SectionWrapper(Works, "projects");
