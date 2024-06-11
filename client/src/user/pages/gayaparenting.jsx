import SectionGayaParenting from "../edukasi/gayaParenting/layouts/SectionGayaParenting";
import SectionCardGaya from "../edukasi/gayaParenting/layouts/SectionCardGaya";
import { useEffect } from "react";
import LayoutUser from "../layout";
import BannerGaya from "../edukasi/gayaParenting/layouts/BannerGaya";

function GayaParenting() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LayoutUser>
      <SectionGayaParenting />
      <SectionCardGaya />
      <BannerGaya />
    </LayoutUser>
  );
}

export default GayaParenting;
