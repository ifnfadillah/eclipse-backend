import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardArtikel from "../components/cardArtikel";
import LayoutUser from "../layout";
import axios from "axios";
import moment from "moment";
import { shuffle } from "lodash";
import { motion } from "framer-motion";

function DetailArtikel() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedArticles, setDisplayedArticles] = useState([]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
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
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/artikel/${id}`);
        setArticle(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/artikel");
        setDisplayedArticles(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchArticle();
    fetchArticles();

    return () => {
      window.scrollTo(0, 0); // Reset scroll ke atas setiap kali komponen unmount
    };
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!article) {
    return <div>Artikel tidak ditemukan</div>;
  }

  // Tampilkan data artikel
  return (
    <LayoutUser>
      {/* Konten artikel */}
      <div className="w-full px-5 mt-5 sm:px-8 py-10 flex flex-col items-center gap-12">
        {/* Judul dan informasi artikel */}
        <RevealAnimation>
          <div className="w-full max-w-[1290px] rounded-[25px] flex flex-col gap-3">
            <div className="text-neutral-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-primary leading-20">{article.judul}</div>
            <div className="text-neutral-400 text-lg font-semibold font-primary">
              {moment(article.tanggal).format("DD MMMM YYYY")} - {article.author}
            </div>
          </div>
        </RevealAnimation>
        {/* Gambar artikel */}
        <RevealAnimation>{article.foto && <img className="w-full md:max-w-[1200px] md:h-[467px] rounded-[20px] object-cover" src={`http://localhost:3001/uploads/${article.foto}`} alt={article.judul} />}</RevealAnimation>
        {/* Isi artikel */}
        <RevealAnimation>
          <div className="w-full max-w-[1290px] rounded-[25px] flex flex-col gap-6">
            <div className="text-neutral-700 rounded-[25px] p-6 bg-zinc-100 text-sm md:text-xl font-primary leading-9">
              {article.isi.split('",').map((paragraph, index) => (
                <p key={index} className="mb-6 text-justify">
                  {paragraph.replace(/"/g, "").trim()}
                </p>
              ))}
            </div>
          </div>
        </RevealAnimation>
      </div>
      {/* Artikel lainnya */}
      <RevealAnimation>
        <div className="container py-8 max-w-screen-xl sm:py-16 lg:px-6 mb-8">
          <div className="flex flex-row justify-between mb-10 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-primary mb-3 font-semibold">Artikel Lainnya</h1>
            <Link to="/artikel">
              <div className="w-[154px] h-[51px] px-5 py-[15px] bg-white rounded-xl shadow border-2 border-sky-700 text-sky-700 justify-center items-center gap-2.5 inline-flex hover:bg-sky-700 hover:text-sky-50 transition-all duration-300">
                <div className=" text-sm font-medium font-primary ">Selengkapnya</div>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-4">
            {/* Menampilkan artikel lainnya */}
            {shuffle(displayedArticles)
              .filter((a) => a.id !== parseInt(id))
              .slice(0, 3)
              .map((a) => (
                <Link key={a.id} to={`/artikel/${a.id}`} className="mx-2">
                  <CardArtikel imageSrc={`http://localhost:3001/uploads/${a.foto}`} title={a.judul} description={a.isi} date={moment(a.tanggal).format("DD MMMM YYYY")} />
                </Link>
              ))}
          </div>
        </div>
      </RevealAnimation>
    </LayoutUser>
  );
}

export default DetailArtikel;
