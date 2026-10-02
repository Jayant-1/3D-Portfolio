import { motion } from "framer-motion";

import useEntryTiming from "../reactbits/hooks/useEntryTiming";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    const { delayChildren, staggerChildren } = useEntryTiming({
      groupId: "sections",
      stagger: 0.08,
    });

    return (
      <motion.section
        variants={staggerContainer(staggerChildren, delayChildren)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
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
