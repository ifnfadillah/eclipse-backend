import SectionCTA from "@/user/components/CTA/SectionCTA";
import { Link } from "react-router-dom";

const SectionHasil = ({ gayaParenting, deksripsi, imgUrl, link }) => {
  return (
    <SectionCTA judul1={`Gaya Parenting Anda adalah  ${gayaParenting}`} deksripsi={deksripsi} imgUrl={imgUrl} btn2={<Link to={link}>Lihat Gaya Parenting</Link>}>
      <Link to="/">Kembali ke Beranda</Link>
    </SectionCTA>
  );
};

export default SectionHasil;
