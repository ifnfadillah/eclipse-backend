import SectionKidspedia from "../kidspedia/layouts/SectionKidspedia";
import FeaturesKidspedia from "../kidspedia/layouts/FeaturesKidspedia";
import BannerKidspedia from "../kidspedia/layouts/BannerKidspedia";
import { useEffect } from "react";
import LayoutUser from "../layout";

function Kidspedia() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LayoutUser>
      <SectionKidspedia />
      <FeaturesKidspedia />
      <BannerKidspedia />
    </LayoutUser>
  );
}

export default Kidspedia;
