import { useEffect, useState } from "react";

import useParallax from "../reactbits/hooks/useParallax";
import { styles } from "../styles";
import useMediaQuery from "../utils/useMediaQuery";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const typedItems = ["Developer", "Freelancer", "Designer", "Learner"];
  const [itemIndex, setItemIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const { style: parallaxStyle } = useParallax({
    strength: 0.03,
    maxOffset: 15,
    enabled: !isMobile,
  });

  useEffect(() => {
    const typeItem = () => {
      if (charIndex < typedItems[itemIndex].length) {
        setTypedText((prevText) => prevText + typedItems[itemIndex][charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setItemIndex((itemIndex + 1) % typedItems.length);
          setCharIndex(0);
          setTypedText("");
        }, 1000); // Delay before typing the next item
      }
    };

    const typingInterval = setInterval(typeItem, 100); // Typing speed

    return () => clearInterval(typingInterval);
  }, [charIndex, itemIndex]);
  return (
    <section className={`relative w-full h-[75vh] sm:h-screen mx-auto`} id="hero">
      <div
        className={`absolute inset-0 top-[90px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-3 sm:gap-5 pointer-events-none`}
      >
        <div className="flex flex-col justify-center items-center mt-3 sm:mt-5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-32 violet-gradient" />
        </div>

        <div style={parallaxStyle} className="pointer-events-auto">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Jayant Potdar</span>
          </h1>
          <p className={`${styles.heroSubText} mt-1.5 sm:mt-2 text-white-100`}>
            I'm{" "}
            <span
              className="typed"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(245, 202, 153, 0.5), rgba(245, 202, 153, 0.5))",
                backgroundRepeat: "no-repeat",
                backgroundSize: isMobile ? "100% 3px" : "100% 8px",
                backgroundPosition: isMobile ? "0px 90%" : "0 100%",
                color: "rgb(145, 94, 255)",
                display: "inline-block",
                fontWeight: "bold",
              }}
            >
              {typedText}
            </span>
            <span className="typed-cursor" aria-hidden="true">
              |
            </span>
            <br />
            <span className="text-xs sm:text-base font-medium opacity-90 inline-block mt-1">
              Bring on the challenges, I'm ready to soak up knowledge!
            </span>
          </p>
        </div>
      </div>

      <ComputersCanvas />
    </section>
  );
};

export default Hero;
