import SectionCTA from "@/user/components/CTA/SectionCTA";
import CardGizi from "@/user/components/CardGizi";
import CardPerilaku from "@/user/components/CardPerilaku";
import SectionAyah from "@/user/components/SectionAyah";
import SectionGizi from "@/user/components/SectionGizi";
import SectionParaAhli from "@/user/components/SectionParaAhli";
import SectionPola from "@/user/components/SectionPola";
import LayoutUser from "@/user/layout";
import BannerDetailPanduan from "../components/Banner/BannerDetailPanduan";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { polaAsuh } from "../data/polaAsuh";
import CardCategory from "../components/CardCategory";
import Judul from "../components/Judul";
import JudulFitur from "../components/JudulFitur";
import ButtonCTA2 from "../components/CTA/Button/ButtonCTA2";
import { motion } from "framer-motion";

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

const DetailPanduan = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  const pola = polaAsuh.find((pola) => pola.id === parseInt(id));

  if (!pola) {
    return <div>Pola Asuh tidak ditemukan</div>;
  }

  const otherPolas = polaAsuh.filter((pola) => pola.id !== parseInt(id));

  return (
    <LayoutUser>
      <div className="section-panduan">
        <RevealAnimation>
          <SectionCTA judul2={"Pada " + pola.title} fitur="Panduan Pola Asuh  " imgUrl={pola.imageCTA}>
            <Link key={pola.id} to={`/panduan-asuh/${pola.id}`}>
              Lihat Panduan Pola Asuh
            </Link>
          </SectionCTA>
        </RevealAnimation>

        <RevealAnimation>
          <CardPerilaku kategori={pola.category} deskripsi={pola.descPerilaku} pertanyaan="Bagaimana Perilaku" />
        </RevealAnimation>

        <RevealAnimation>
          <SectionPola
            judul="Pola Asuh"
            kategori={"yang Tepat pada " + pola.category}
            descSection={pola.descSection}
            imgUrl={pola.imagePanduan}
            desc1={pola.guidelines[0]}
            desc2={pola.guidelines[1]}
            desc3={pola.guidelines[2]}
            desc4={pola.guidelines[3]}
          />
        </RevealAnimation>

        <RevealAnimation>
          <SectionAyah desc={pola.fatherTips} imgUrl={pola.imageSaran} />
        </RevealAnimation>

        <RevealAnimation>
          <SectionGizi usia={pola.umur}>
            <CardGizi judul={pola.nutrisi[1].title} desc={pola.nutrisi[1].desc} />
            <CardGizi judul={pola.nutrisi[2].title} desc={pola.nutrisi[2].desc} />
            <CardGizi judul={pola.nutrisi[3].title} desc={pola.nutrisi[3].desc} />
          </SectionGizi>
        </RevealAnimation>

        <RevealAnimation>
          <SectionParaAhli desk={pola.expertAdvice} nama={pola.ahli} pekerjaan={pola.pekerjaan} imgUrl={pola.imageAhli} />
        </RevealAnimation>
        <RevealAnimation>
          <div className="py-8 mx-auto max-w-screen-xl">
            <div className="mx-auto text-center mb-6">
              <div className="flex items-center justify-between mb-4">
                <Judul className="text-left">
                  <JudulFitur>Pola Asuh </JudulFitur> lainnya
                </Judul>
                <ButtonCTA2>
                  <Link to="/edukasi/panduan-asuh">Selengkapnya</Link>
                </ButtonCTA2>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
                  {otherPolas.map((pola) => (
                    <Link key={pola.id} to={`/edukasi/panduan-asuh/${pola.id}`}>
                      <CardCategory title={pola.title} imageUrl={pola.imageCard} className="mx-2" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>{" "}
        </RevealAnimation>

        <RevealAnimation>
          <BannerDetailPanduan />
        </RevealAnimation>
      </div>
    </LayoutUser>
  );
};

export default DetailPanduan;
