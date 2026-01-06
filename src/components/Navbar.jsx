import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import useNavPeek from "../reactbits/hooks/useNavPeek";

const NAV_LINKS = [
  { title: "home", href: "#hero", img: "/assets/nav-link-previews/home.png" },
  {
    title: "about",
    href: "#about",
    img: "/assets/nav-link-previews/about.png",
  },
  {
    title: "project",
    href: "#projects",
    img: "/assets/nav-link-previews/projects.png",
  },
  {
    title: "achievements",
    href: "#achievements",
    img: "/assets/nav-link-previews/achievements.png",
  },
  {
    title: "skills",
    href: "#skills",
    img: "/assets/nav-link-previews/skills.png",
  },
  {
    title: "testimonials",
    href: "#testimonials",
    img: "/assets/nav-link-previews/testimonials.png",
  },
  {
    title: "contact",
    href: "#contact",
    img: "/assets/nav-link-previews/contact.png",
  },
];

const opacity = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.35 } },
  closed: { opacity: 0, transition: { duration: 0.35 } },
};
const height = {
  initial: { height: 0 },
  enter: {
    height: "auto",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
  exit: { height: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
};
const blur = {
  initial: { filter: "blur(0px)", opacity: 1 },
  open: { filter: "blur(4px)", opacity: 0.6, transition: { duration: 0.3 } },
  closed: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.3 } },
};
const translate = {
  initial: { y: "100%", opacity: 0 },
  enter: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i[0] },
  }),
  exit: (i) => ({
    y: "100%",
    opacity: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i[1] },
  }),
};

function getChars(word) {
  return word.split("").map((char, i) => (
    <motion.span
      className="pointer-events-none"
      custom={[i * 0.02, (word.length - i) * 0.01]}
      variants={translate}
      initial="initial"
      animate="enter"
      exit="exit"
      key={char + i}
      style={{ display: "inline-block" }}
    >
      {char}
    </motion.span>
  ));
}

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    hoverIndex,
    activeIndex,
    isHovering,
    preview,
    focusedIndex,
    handleEnter,
    handleLeave,
    handleClick,
  } = useNavPeek(NAV_LINKS);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`z-30 fixed top-0 left-0 w-full transition-colors duration-500 ease-in  ${
        scrolled ? "backdrop-blur-xl" : ""
      } `}
      style={{
        background: scrolled ? "rgba(10,10,20,0.8)" : "transparent",
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between max-w-8xl my-2 mx-4 relative">
        <a href="#hero" className="flex mx-6 items-center justify-center">
          <span className="text-md">
            <img src={logo} alt="logo" className="h-16 object-contain" />
          </span>
        </a>
        <button
          onClick={() => setIsActive((v) => !v)}
          className="flex items-center justify-center gap-3 m-0 p-0 h-6 bg-transparent text-base font-normal"
          style={{ margin: window.innerWidth >= 600 ? "20px" : "15px" }}
        >
          <div
            className="relative flex items-center text-[22px]"
            style={{ minWidth: 60 }}
          >
            <motion.p
              variants={opacity}
              animate={!isActive ? "open" : "closed"}
              className="transition-opacity"
              style={{
                margin: 0,
                position: !isActive ? "static" : "absolute",
                left: 0,
              }}
            >
              Menu
            </motion.p>
            <motion.p
              variants={opacity}
              animate={isActive ? "open" : "closed"}
              className="transition-opacity"
              style={{
                margin: 0,
                position: isActive ? "static" : "absolute",
                left: 0,
              }}
            >
              Close
            </motion.p>
          </div>
          <div className="relative w-[22.5px] h-[16px] flex flex-col justify-center items-center mx-2">
            {/* Top line */}
            <motion.span
              className="absolute left-0 w-full h-[1px] bg-white block"
              style={{ top: 0 }}
              animate={
                isActive ? { rotate: 45, top: "7.5px" } : { rotate: 0, top: 0 }
              }
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            />
            {/* Middle line */}
            <motion.span
              className="absolute left-0 w-full h-[1px] bg-white block"
              style={{ top: "7.5px" }}
              animate={
                isActive
                  ? { opacity: 0 }
                  : { opacity: 1, rotate: 0, top: "7.5px" }
              }
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            />
            {/* Bottom line */}
            <motion.span
              className="absolute left-0 w-full h-[1px] bg-white block"
              style={{ top: "15px" }}
              animate={
                isActive
                  ? { rotate: -45, top: "7.5px" }
                  : { rotate: 0, top: "15px" }
              }
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>
        </button>
      </div>
      <motion.div
        variants={height}
        initial="initial"
        animate={isActive ? "enter" : "exit"}
        className="w-full left-0 absolute"
        style={{ zIndex: 20, background: "rgba(7,8,13,0.9)" }}
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="flex flex-row justify-between items-center w-full max-w-8xl mx-auto relative min-h-[60vh]"
              style={{ minHeight: 600 }}
            >
              <div className="flex flex-wrap items-start gap-1 w-2/3 pl-8">
                {NAV_LINKS.map((link, idx) => (
                  <a
                    key={link.title}
                    href={link.href}
                    className="group cursor-pointer rounded-lg px-3 py-2 text-5xl md:text-7xl font-extrabold uppercase transition-all duration-200 whitespace-nowrap text-left relative"
                    style={{ minHeight: "4.5rem" }}
                    onMouseOver={() => {
                      handleEnter(idx);
                    }}
                    onMouseLeave={handleLeave}
                    onClick={() => {
                      setIsActive(false);
                      handleClick(idx);
                    }}
                  >
                    <motion.p
                      variants={blur}
                      animate={
                        isHovering && focusedIndex !== idx ? "open" : "closed"
                      }
                      style={{
                        display: "inline-block",
                        margin: 0,
                        color:
                          focusedIndex === idx && isHovering
                            ? "#fff"
                            : "#8eadff",
                        transition: "color 0.3s, text-shadow 0.3s",
                        textShadow:
                          focusedIndex === idx && isHovering
                            ? "0 0 10px #fff, 0 0 100px #121212"
                            : "none",
                      }}
                    >
                      {getChars(link.title.toUpperCase())}
                    </motion.p>
                    <motion.div
                      layoutId={`${isActive ? "" : "underline"}`}
                      className="absolute left-0 bottom-0 h-[4px] rounded origin-left"
                      style={{
                        background:
                          focusedIndex === idx && isHovering
                            ? "#fff"
                            : "#8eadff",
                      }}
                      initial={{ width: 0, opacity: 0 }}
                      animate={
                        focusedIndex === idx && isHovering
                          ? { width: "100%", opacity: 1 }
                          : { width: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                    />
                  </a>
                ))}
              </div>
              {isActive && (
                <motion.div
                  variants={opacity}
                  initial="initial"
                  animate={isHovering ? "open" : "closed"}
                  className="hidden md:flex items-center justify-start w-1/3 h-full"
                  style={{ minHeight: 200 }}
                >
                  <img
                    src={preview || NAV_LINKS[activeIndex].img}
                    alt={
                      NAV_LINKS[focusedIndex]?.title ||
                      NAV_LINKS[activeIndex].title
                    }
                    className="object-cover rounded-lg shadow-lg border border-white/20"
                    style={{
                      width: "480px",
                      height: "270px",
                      aspectRatio: "16/9",
                      maxWidth: "90vw",
                      maxHeight: "60vh",
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
