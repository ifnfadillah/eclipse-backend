import React from "react";
import LayoutUser from "../layout";
import BannerKomunitas from "../sharenting/komunitas/layouts/BannerKomunitas";
import SectionKomunitas from "../sharenting/komunitas/layouts/SectionKomunitas";

function Komunitas() {
  return (
    <LayoutUser>
      <SectionKomunitas />
      <BannerKomunitas />
    </LayoutUser>
  );
}

export default Komunitas;
