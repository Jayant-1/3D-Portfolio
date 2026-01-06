import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { github } from "../assets";

const ProjectModal = ({
  project,
  isOpen,
  onClose,
  projects = [],
  currentIndex = -1,
  onNavigate,
  previewReady = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Keyboard navigation - Hook must be called before any conditional returns
  useEffect(() => {
    if (!isOpen || !project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        if (onNavigate && currentIndex > 0) {
          onNavigate(currentIndex - 1);
          setCurrentImageIndex(0);
        }
      } else if (e.key === "ArrowRight") {
        if (onNavigate && currentIndex < projects.length - 1) {
          onNavigate(currentIndex + 1);
          setCurrentImageIndex(0);
        }
      } else if (e.key === "ArrowUp") {
        setCurrentImageIndex((prev) =>
          prev > 0 ? prev - 1 : (project?.images?.length || 1) - 1
        );
      } else if (e.key === "ArrowDown") {
        setCurrentImageIndex((prev) =>
          prev < (project?.images?.length || 1) - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    onClose,
    onNavigate,
    currentIndex,
    project,
    project?.images?.length,
    projects.length,
  ]);

  // Early return after all hooks
  if (!project) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const images = project.images || [project.image];
  const currentImage = images[currentImageIndex] || project.image;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: previewReady ? 10 : 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              duration: previewReady ? 0.25 : 0.3,
              type: "spring",
              damping: 25,
            }}
            className="relative bg-[#1a1f35] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-200 group"
              aria-label="Close modal"
              title="Press ESC to close"
            >
              <svg
                className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Navigation Arrows (Left/Right for projects) */}
            {projects.length > 1 && currentIndex >= 0 && (
              <>
                <button
                  onClick={() => {
                    if (onNavigate && currentIndex > 0) {
                      onNavigate(currentIndex - 1);
                      setCurrentImageIndex(0);
                    }
                  }}
                  disabled={currentIndex === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  aria-label="Previous project"
                  title="← Previous project"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    if (onNavigate && currentIndex < projects.length - 1) {
                      onNavigate(currentIndex + 1);
                      setCurrentImageIndex(0);
                    }
                  }}
                  disabled={currentIndex === projects.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  aria-label="Next project"
                  title="→ Next project"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Project Image Carousel */}
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-t-3xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={currentImage}
                  alt={`${project.name} ${currentImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f35] via-transparent to-transparent"></div>

              {/* Image Carousel Controls (if multiple images) */}
              {images.length > 1 && (
                <>
                  {/* Carousel Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex
                            ? "w-8 bg-blue-500"
                            : "w-2 bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Image Counter */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-medium">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                {project.name}
              </motion.h2>

              {/* Metrics Row (if available) */}
              {(project.metrics ||
                project.github_stars ||
                project.forks ||
                project.views) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-white/10"
                >
                  {(project.metrics?.stars || project.github_stars) && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-white font-semibold">
                        {project.metrics?.stars || project.github_stars}
                      </span>
                    </div>
                  )}
                  {(project.metrics?.forks || project.forks) && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5a2 2 0 012-2h4a2 2 0 012 2m-2-9v2m-6 0v2m4-2v2"
                        />
                      </svg>
                      <span className="text-white font-semibold">
                        {project.metrics?.forks || project.forks}
                      </span>
                    </div>
                  )}
                  {(project.metrics?.views || project.views) && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span className="text-white font-semibold">
                        {project.metrics?.views || project.views}
                      </span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  About This Project
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              {/* Key Features (if available) */}
              {project.features && project.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8 pb-6 border-b border-white/10"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + index * 0.05 }}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <span className="text-blue-400 mt-1 font-bold">✓</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, index) => (
                    <motion.span
                      key={`${project.name}-${tag.name}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.45 + index * 0.05 }}
                      className={`px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium ${tag.color} hover:bg-white/10 transition-all duration-200`}
                    >
                      #{tag.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* Live Demo Button */}
                {project.live_demo_link && (
                  <button
                    onClick={() =>
                      window.open(project.live_demo_link, "_blank")
                    }
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      <path d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
                    </svg>
                    Live Demo
                  </button>
                )}

                {/* Source Code Button */}
                <button
                  onClick={() =>
                    window.open(project.source_code_link, "_blank")
                  }
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <img src={github} alt="github" className="w-6 h-6" />
                  Source Code
                </button>
              </motion.div>

              {/* Keyboard Shortcuts Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                <p className="text-xs text-gray-500 mb-2 font-semibold">
                  KEYBOARD SHORTCUTS
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-400">
                  <div>
                    <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">
                      ESC
                    </kbd>{" "}
                    Close
                  </div>
                  <div>
                    <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">
                      ←/→
                    </kbd>{" "}
                    Projects
                  </div>
                  <div>
                    <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">
                      ↑/↓
                    </kbd>{" "}
                    Images
                  </div>
                  <div>
                    <span className="text-blue-400">
                      💡 Tip: Use arrow keys!
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
