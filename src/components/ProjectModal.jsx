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

  const handleWheel = (e) => {
    // Prevent scroll propagation to background
    e.stopPropagation();
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: previewReady ? 6 : 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{
              duration: previewReady ? 0.2 : 0.24,
              type: "spring",
              damping: 26,
            }}
            className="relative bg-[#1a1f35] rounded-3xl max-w-4xl w-full max-h-[82vh] overflow-y-auto shadow-2xl top-8 hide-scroll border border-white/10"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255, 255, 255, 0.06), 0 20px 80px rgba(0, 0, 0, 0.55), 0 0 60px rgba(139, 92, 246, 0.08)",
            }}
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
          >
            <style>{`.hide-scroll::-webkit-scrollbar{display:none;} .hide-scroll{scrollbar-width:none; -ms-overflow-style:none; overscroll-behavior: contain;}`}</style>
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

              {/* Metrics Row - Always Show */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-6 mb-6 pb-4 border-b border-white/10"
              >
                {/* Stars - Apple SF Symbol Style */}
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-white font-semibold text-sm tracking-tight">
                    {project.metrics?.stars ?? 0}
                  </span>
                </div>
                {/* Forks - Apple SF Symbol Style (Code Branch) */}
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="6" y1="3" x2="6" y2="15" />
                    <circle cx="18" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M18 9a9 9 0 01-9 9" />
                  </svg>
                  <span className="text-white font-semibold text-sm tracking-tight">
                    {project.metrics?.forks ?? 0}
                  </span>
                </div>
                {/* Views - Apple SF Symbol Style (Eye) */}
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="text-white font-semibold text-sm tracking-tight">
                    {project.metrics?.views ?? 0}
                  </span>
                </div>
              </motion.div>

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
                      stroke="currentColor"
                      strokeWidth="2.2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
                      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
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
