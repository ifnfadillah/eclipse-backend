import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardArtikel from "../components/cardArtikel";
import LayoutUser from "../layout";
import axios from "axios";
import moment from "moment";

function DetailArtikel() {
  const { id } = useParams(); // Mengambil ID artikel dari URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedArticles, setDisplayedArticles] = useState([]);

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
        <div className="w-full max-w-[1290px] rounded-[25px] flex flex-col gap-3">
          <div className="text-neutral-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-primary leading-20">
            {article.judul}
          </div>
          <div className="text-neutral-400 text-lg font-semibold font-primary">
            {moment(article.tanggal).format("DD MMMM YYYY")} - {article.author}
          </div>
        </div>
        {/* Gambar artikel */}
        {article.foto && (
          <img
            className="w-full md:max-w-[1200px] md:h-[467px] rounded-[20px] object-cover"
            src={`http://localhost:3001/uploads/${article.foto}`}
            alt={article.judul}
          />
        )}
        {/* Isi artikel */}
        <div className="w-full max-w-[1290px] rounded-[25px] flex flex-col gap-6">
          <div className="text-neutral-700 rounded-[25px] p-6 bg-zinc-100 text-sm md:text-xl font-primary leading-9">
            {article.isi.split('",').map((paragraph, index) => (
              <p key={index} className="mb-6 text-justify">
                {paragraph.replace(/"/g, "").trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Artikel lainnya */}
      <div className="container py-8 max-w-screen-xl sm:py-16 lg:px-6 mb-8">
        <div className="flex flex-row justify-between mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-primary mb-3 font-semibold">
            Artikel Lainnya
          </h1>
          <Link to="/artikel-list">
            <div className="w-[154px] h-[51px] px-5 py-[15px] bg-white rounded-xl shadow border-2 border-sky-700 text-sky-700 justify-center items-center gap-2.5 inline-flex hover:bg-sky-700 hover:text-sky-50 transition-all duration-300">
              <div className=" text-sm font-medium font-primary ">
                Selengkapnya
              </div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-4">
          {/* Menampilkan artikel lainnya */}
          {displayedArticles.map((article) => (
            <Link
              key={article.id}
              to={`/artikel/${article.id}`}
              className="mx-2"
            >
              <CardArtikel
                imageSrc={`http://localhost:3001/uploads/${article.foto}`}
                title={article.judul}
                description={article.isi} // Perhatikan bahwa ini mungkin perlu diubah sesuai dengan format yang diinginkan
                date={moment(article.tanggal).format("DD MMMM YYYY")}
              />
            </Link>
          ))}
        </div>
      </div>
    </LayoutUser>
  );
}

export default DetailArtikel;
