import { useEffect } from "react";
import BannerKidspedia from "../kidspedia/layouts/BannerKidspedia";
import LayoutUser from "../layout";
import SectionVideo from "../kidspedia/videoPembelajaran/layouts/SectionVideo";

const ListVideoBelajar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <LayoutUser>
      <SectionVideo />
      <BannerKidspedia />
    </LayoutUser>
  );
};

export default ListVideoBelajar;
