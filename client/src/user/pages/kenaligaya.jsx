import BannerPanduan from "../components/BannerPanduan";
import SectionKenaliGaya from "../edukasi/kenaliGaya/layouts/SectionKenaliGaya";
import { useEffect } from "react";
import LayoutUser from "../layout";
import BannerKenali from "../edukasi/kenaliGaya/layouts/BannerKenali";

function KenaliGaya() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LayoutUser>
      <SectionKenaliGaya />
      <BannerKenali />
    </LayoutUser>
  );
}

export default KenaliGaya;
