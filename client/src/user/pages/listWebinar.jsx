import React from "react";
import LayoutUser from "../layout";
import BannerWebinar from "../sharenting/webinar/layouts/BannerWebinar";
import SectionWebinar from "../sharenting/webinar/layouts/SectionWebinar";

function Webinar() {
  return (
    <LayoutUser>
      <SectionWebinar />
      <BannerWebinar />
    </LayoutUser>
  );
}

export default Webinar;
