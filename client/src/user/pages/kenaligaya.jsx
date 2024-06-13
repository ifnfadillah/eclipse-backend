import SectionKenaliGaya from "../edukasi/kenaliGaya/layouts/SectionKenaliGaya";
import { useEffect } from "react";
import LayoutUser from "../layout";
import BannerKenali from "../edukasi/kenaliGaya/layouts/BannerKenali";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeInOut" },
  },
};

const slideVariants = {
  hidden: { left: 0 },
  visible: { left: "100%" },
};

const RevealAnimation = ({ children }) => (
  <div style={{ position: "relative", overflow: "hidden" }}>
    <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {children}
    </motion.div>

    <motion.div
      variants={slideVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      style={{
        position: "absolute",
        top: 4,
        bottom: 4,
        left: 0,
        right: 0,
        background: "var(--brand)",
        zIndex: 20,
      }}
    />
  </div>
);

function KenaliGaya() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LayoutUser>
      <RevealAnimation>
        <SectionKenaliGaya />
      </RevealAnimation>

      <RevealAnimation>
        <BannerKenali />
      </RevealAnimation>
    </LayoutUser>
  );
}

export default KenaliGaya;
