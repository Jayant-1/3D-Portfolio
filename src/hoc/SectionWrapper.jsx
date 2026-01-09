import { motion } from "framer-motion";

import useEntryTiming from "../reactbits/hooks/useEntryTiming";
import useSectionObserver from "../reactbits/hooks/useSectionObserver";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    const { ref, amount, inView } = useSectionObserver({ threshold: 0.22 });
    const { delayChildren, staggerChildren } = useEntryTiming({
      groupId: "sections",
      stagger: 0.08,
    });

    return (
      <motion.section
        ref={ref}
        variants={staggerContainer(staggerChildren, delayChildren)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        viewport={{ once: true, amount }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
