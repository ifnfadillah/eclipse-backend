import SectionHome from "../beranda/layouts/SectionHome";
import FeaturesHome from "../beranda/layouts/FeaturesHome";
import Testimonial from "../beranda/layouts/Testimonial";
import VideoShowcase from "../beranda/layouts/VideoShowcase";
import Faq from "../beranda/layouts/Faq";
import SectionMitra from "../beranda/layouts/SectionMitra";
import { useEffect } from "react";
import LayoutUser from "../layout";

function HomeUser() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LayoutUser>
      <SectionHome />
      <SectionMitra />
      <FeaturesHome />
      <Testimonial />
      <VideoShowcase />
      <Faq />
    </LayoutUser>
  );
}

export default HomeUser;
