import { useEffect } from "react";
import { motion } from "framer-motion";
import SectionHome from "../beranda/layouts/SectionHome";
import FeaturesHome from "../beranda/layouts/FeaturesHome";
import Testimonial from "../beranda/layouts/Testimonial";
import VideoShowcase from "../beranda/layouts/VideoShowcase";
import Faq from "../beranda/layouts/Faq";
import SectionMitra from "../beranda/layouts/SectionMitra";
import LayoutUser from "../layout";

const sectionVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: "easeInOut" },
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

function HomeUser() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LayoutUser>
      <RevealAnimation>
        <SectionHome />
      </RevealAnimation>

      <RevealAnimation>
        <SectionMitra />
      </RevealAnimation>

      <RevealAnimation>
        <FeaturesHome />
      </RevealAnimation>

      <RevealAnimation>
        <Testimonial />
      </RevealAnimation>

      <RevealAnimation>
        <VideoShowcase />
      </RevealAnimation>

      <RevealAnimation>
        <Faq />
      </RevealAnimation>
    </LayoutUser>
  );
}

export default HomeUser;
