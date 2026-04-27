import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { github } from "../assets";

const getProjectImages = (project) => {
  if (!project) return [];
  if (Array.isArray(project.images) && project.images.length > 0) {
    return project.images;
  }
  return project.image ? [project.image] : [];
};

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
  const projectKey = project?.name ?? "";
  const images = useMemo(() => getProjectImages(project), [project]);
  const safeImageIndex =
    images.length > 0 ? Math.min(currentImageIndex, images.length - 1) : 0;

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [projectKey]);

  useEffect(() => {
    if (currentImageIndex !== safeImageIndex) {
      setCurrentImageIndex(safeImageIndex);
    }
  }, [currentImageIndex, safeImageIndex]);

  const navigateToProject = useCallback(
    (newIndex) => {
      if (!onNavigate || newIndex < 0 || newIndex >= projects.length) return;
      setCurrentImageIndex(0);
      onNavigate(newIndex);
    },
    [onNavigate, projects.length]
  );

  // Keyboard navigation - Hook must be called before any conditional returns
  useEffect(() => {
    if (!isOpen || !project) return;

    // Disable body scroll when modal is open to prevent background scrolling
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Prevent default scrolling for arrow keys
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
      }

      const imagesCount = images.length || 1;

      if (e.key === "ArrowLeft") {
        navigateToProject(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        navigateToProject(currentIndex + 1);
      } else if (e.key === "ArrowUp") {
        setCurrentImageIndex((prev) =>
          prev > 0 ? prev - 1 : imagesCount - 1
        );
      } else if (e.key === "ArrowDown") {
        setCurrentImageIndex((prev) =>
          prev < imagesCount - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isOpen,
    onClose,
    navigateToProject,
    currentIndex,
    project,
    images.length,
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

  const currentImage = images[safeImageIndex] || project.image;

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

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
            className="relative bg-[#1a1f35] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl top-12 hide-scroll border border-white/10"
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
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all duration-200 group border border-white/10"
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

            {/* Navigation Arrows (For projects) */}
            {projects.length > 1 && (
              <>
                <button
                  onClick={() => {
                    navigateToProject(currentIndex - 1);
                  }}
                  disabled={currentIndex === 0}
                  className="fixed left-2 md:left-10 lg:left-72 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all duration-200 disabled:opacity-0 disabled:cursor-not-allowed group border border-white/10"
                  aria-label="Previous project"
                  title="← Previous project"
                >
                  <svg
                    className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform duration-200"
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
                    navigateToProject(currentIndex + 1);
                  }}
                  disabled={currentIndex === projects.length - 1}
                  className="fixed right-2 md:right-10 lg:right-72 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all duration-200 disabled:opacity-0 disabled:cursor-not-allowed group border border-white/10"
                  aria-label="Next project"
                  title="→ Next project"
                >
                  <svg
                    className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform duration-200"
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
            <div
              key={projectKey}
              className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-t-3xl group/carousel bg-[#0d1120]"
            >
              <motion.img
                key={`${projectKey}-${safeImageIndex}-${currentImage}`}
                src={currentImage}
                alt={`${project.name} ${safeImageIndex + 1}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28 }}
                className="w-full h-full object-contain md:object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f35] via-[#1a1f35]/20 to-transparent opacity-90 pointer-events-none"></div>

              {/* Image Carousel Controls (if multiple images) */}
              {images.length > 1 && (
                <>
                  {/* Image Navigation Arrows */}
                  <div className="absolute inset-y-0 left-0 flex items-center px-2 md:px-4 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10">
                    <button
                      onClick={prevImage}
                      className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-all duration-200 hover:scale-110 border border-white/10"
                      aria-label="Previous image"
                    >
                      <svg className="w-6 h-6 pr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 md:px-4 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10">
                    <button
                      onClick={nextImage}
                      className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-all duration-200 hover:scale-110 border border-white/10"
                      aria-label="Next image"
                    >
                      <svg className="w-6 h-6 pl-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="absolute bottom-6 left-0 w-full px-4 flex justify-center z-10">
                    <div className="flex gap-2 sm:gap-3 p-2 bg-black/50 backdrop-blur-md rounded-2xl overflow-x-auto hide-scroll max-w-[95%] sm:max-w-[85%] border border-white/10 shadow-xl">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }}
                          className={`relative w-14 h-10 sm:w-20 sm:h-14 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
                            idx === safeImageIndex
                              ? "ring-2 ring-blue-500 scale-105 opacity-100 z-10 shadow-lg"
                              : "opacity-40 hover:opacity-100 hover:scale-105"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-semibold border border-white/10 shadow-lg z-10 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {safeImageIndex + 1} / {images.length}
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
