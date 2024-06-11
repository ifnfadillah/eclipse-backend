import SectionPanduan from "../edukasi/panduanAsuh/layouts/SectionPanduan";
import SectionCategory from "../edukasi/panduanAsuh/layouts/SectionCategory";

import BannerPanduan from "../edukasi/panduanAsuh/layouts/BannerPanduan";
import { useEffect } from "react";
import LayoutUser from "../layout";

function PanduanAsuh() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LayoutUser>
      <SectionPanduan />
      <SectionCategory />
      <BannerPanduan />
    </LayoutUser>
  );
}

export default PanduanAsuh;
