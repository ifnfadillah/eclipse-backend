import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LayoutUser from "../layout";
import CardWebinar from "../components/CardWebinar";
import axios from "axios";
import moment from "moment";

// Fungsi untuk memeriksa dan memformat harga
const formatPrice = (price) => {
  // Coba konversi harga menjadi angka
  const numericPrice = parseFloat(price);

  // Periksa apakah konversi berhasil (tidak menghasilkan NaN)
  if (!isNaN(numericPrice)) {
    // Jika harga adalah angka, format sebagai Rupiah
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(numericPrice);
  } else {
    // Jika harga adalah teks, tampilkan teks tersebut
    return price;
  }
};

function DetailWebinar() {
  const { id } = useParams();
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedWebinars, setDisplayedWebinars] = useState([]);

  useEffect(() => {
    const fetchWebinar = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/webinar/${id}`);
        setWebinar(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebinar();
  }, [id]);

  useEffect(() => {
    const fetchOtherWebinars = async () => {
      try {
        const response = await axios.get("http://localhost:3001/webinar");
        const otherWebinars = response.data.filter((item) => item.id !== parseInt(id));
        const shuffledWebinars = otherWebinars.sort(() => Math.random() - 0.5).slice(0, 3);
        setDisplayedWebinars(shuffledWebinars);
      } catch (error) {
        console.error("Error fetching other webinars:", error);
      }
    };

    fetchOtherWebinars();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!webinar) {
    return <div>Webinar tidak ditemukan</div>;
  }

  return (
    <LayoutUser>
      {/* Konten detail webinar */}
      <div className="w-full mt-5 sm:px-8 py-10 flex flex-col items-center gap-12">
        {/* Detail webinar */}
        <div className="flex flex-col md:flex-row items-center px-8">
          {/* Gambar webinar */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <img src={`http://localhost:3001/uploads/${webinar.foto}`} alt={webinar.judul} className="w-full h-auto rounded-xl" />
          </div>
          {/* Informasi webinar */}
          <div className="w-full md:w-2/3 md:px-24 space-y-4 md:space-y-8 font-primary">
            {/* Judul webinar */}
            <h2 className="text-2xl md:text-4xl font-bold">{webinar.judul}</h2>
            {/* Deskripsi webinar */}
            <p className="text-gray-700 text-xs md:text-sm">{webinar.deskripsi}</p>
            {/* Penyelenggara webinar */}
            <h3 className="text-sm font-medium">
              Penyelenggara: <span className="text-sm font-normal">{webinar.narasumber}</span>
            </h3>
            {/* Tanggal webinar */}
            <h3 className="text-sm font-medium">
              Tanggal: <span className="text-sm font-normal">{moment(webinar.tanggal).format("DD MMMM YYYY")}</span>
            </h3>
            {/* Waktu webinar */}
            <h3 className="text-sm font-medium">
              Pukul: <span className="text-sm font-normal">{moment(webinar.waktu, "HH:mm").format("HH:mm")}</span>
            </h3>
            {/* Harga webinar */}
            <h3 className="text-sm font-medium">
              Harga: <span className="text-sm font-normal">{formatPrice(webinar.harga)}</span>
            </h3>
            {/* Tombol daftar */}
            <button
              className="w-full inline-flex items-center justify-center md:w-auto md:px-5 py-3 font-primary text-sm font-medium bg-sky-700 rounded-lg md:rounded-xl shadow border-2 text-white hover:bg-sky-900"
              type="button"
              name="daftar"
            >
              <Link to={webinar.link_daftar} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Daftar Sekarang
                <svg className="w-5 h-5 ml-2 -mr-1 transition duration-300 ease-in-out" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </button>
          </div>
        </div>

        {/* Webinar lainnya */}
        <div className="py-8">
          <div className="flex flex-row justify-between mb-10 text-center sm:text-left items-center">
            <h1 className="lg:text-3xl text-2xl font-primary font-semibold ">Webinar Lainnya</h1>
            <button
              className="px-3 py-2 text-xs md:px-5 md:py-3 font-secondary md:text-sm font-medium bg-white rounded-lg md:rounded-xl shadow border-2 border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-white hover:border-sky-700"
              type="navigate"
              name="selengkapnya"
            >
              <Link to="/sharenting-webinar" className="flex items-center">
                Selengkapnya
                <svg className="w-5 h-5 ml-2 -mr-1 transition duration-300 ease-in-out" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </button>
          </div>
          {/* Daftar webinar lainnya */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8">
            {displayedWebinars.map((webinar) => (
              <Link key={webinar.id} to={`/sharenting-webinar/${webinar.id}`} className="px-2">
                <CardWebinar imageSrc={`http://localhost:3001/uploads/${webinar.foto}`} title={webinar.judul} price={formatPrice(webinar.harga)} date={moment(webinar.tanggal).format("DD MMMM YYYY")} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}

export default DetailWebinar;
