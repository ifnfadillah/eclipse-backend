import CTASharenting from "../sharenting/layouts/SectionSharenting";
import FeaturesSharenting from "../sharenting/layouts/FeaturesSharenting";
import { useEffect } from "react";
import LayoutUser from "../layout";
import BannerSharenting from "../sharenting/layouts/BannerSharenting";

function Sharenting() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LayoutUser>
      <CTASharenting />
      <FeaturesSharenting />
      <BannerSharenting />
    </LayoutUser>
  );
}

export default Sharenting;
