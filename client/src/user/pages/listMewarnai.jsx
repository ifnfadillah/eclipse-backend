import { useEffect } from "react";
import BannerKidspedia from "../kidspedia/layouts/BannerKidspedia";
import LayoutUser from "../layout";
import SectionGambar from "../kidspedia/lembarMewarnai/layouts/SectionGambar";

const ListMewarnai = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <LayoutUser>
      <SectionGambar />
      <BannerKidspedia />
    </LayoutUser>
  );
};

export default ListMewarnai;
