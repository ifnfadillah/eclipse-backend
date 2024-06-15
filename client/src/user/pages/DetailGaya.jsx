import { useEffect } from "react";
import SectionCTA from "../components/CTA/SectionCTA";
import LayoutUser from "../layout";
import { Link, useParams } from "react-router-dom";
import SectionPola from "../components/SectionPola";
import CardPerilaku from "../components/CardPerilaku";
import SectionParaAhli from "../components/SectionParaAhli";
import { gayaParenting } from "../data/gayaParenting";
import Judul from "../components/Judul";
import JudulFitur from "../components/JudulFitur";
import ButtonCTA2 from "../components/CTA/Button/ButtonCTA2";
import CardCategory from "../components/CardCategory";
import BannerGaya from "../edukasi/gayaParenting/layouts/BannerGaya";
import { motion } from "framer-motion";

const DetailGaya = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeInOut" },
    },
  };

  const slideVariants = {
    hidden: { left: 0 },
    visible: { left: "100%" },
  };

  const RevealAnimation = ({ children }) => (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {children}
      </motion.div>

      <motion.div
        variants={slideVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "var(--brand)",
          zIndex: 20,
        }}
      />
    </div>
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const { id } = useParams();

  const gaya = gayaParenting.find((gaya) => gaya.id === parseInt(id));

  if (!gaya) {
    return <div>Gaya Parenting tidak ditemukan</div>;
  }
  const otherGaya = gayaParenting.filter((gaya) => gaya.id !== parseInt(id));

  return (
    <LayoutUser>
      <div className="section-gaya">
        <RevealAnimation>
          <SectionCTA judul2={gaya.title} fitur="Gaya Parenting  " imgUrl={gaya.imageCTA} btn2="Pelajari Lebih Banyak"></SectionCTA>
        </RevealAnimation>

        <RevealAnimation>
          <CardPerilaku kategori={gaya.title} deskripsi={gaya.descGaya} pertanyaan="Apa itu" tanda="?" />
        </RevealAnimation>

        <RevealAnimation>
          <SectionPola
            judul="Perilaku"
            kategori={gaya.title}
            descSection={"Simak perilaku dari gaya parenting " + gaya.title}
            imgUrl={gaya.imagePanduan}
            desc1={gaya.guidelines[0]}
            desc2={gaya.guidelines[1]}
            desc3={gaya.guidelines[2]}
            desc4={gaya.guidelines[3]}
          />
        </RevealAnimation>

        <RevealAnimation>
          <SectionParaAhli desk={gaya.expertAdvice} nama={gaya.ahli} pekerjaan={gaya.pekerjaan} imgUrl={gaya.imageAhli} />
        </RevealAnimation>

        <RevealAnimation>
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 mt-8">
            <div className="mx-auto text-center mb-16">
              <div className="flex items-center justify-between mb-4">
                <Judul className="text-left">
                  <JudulFitur>Gaya Parenting </JudulFitur> lainnya
                </Judul>
                <ButtonCTA2>
                  <Link to="/edukasi/gaya-parenting">Selengkapnya</Link>
                </ButtonCTA2>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
                  {otherGaya.map((gaya) => (
                    <Link key={gaya.id} to={`/edukasi/gaya-parenting/${gaya.id}`}>
                      <CardCategory title={gaya.title} imageUrl={gaya.imageCard} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealAnimation>

        <div>
          <RevealAnimation>
            <BannerGaya />
          </RevealAnimation>
        </div>
      </div>
    </LayoutUser>
  );
};

export default DetailGaya;
