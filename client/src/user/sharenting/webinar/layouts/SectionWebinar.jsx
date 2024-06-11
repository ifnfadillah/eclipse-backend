import React, { useState, useEffect } from "react";
import CardWebinar from "../../../components/CardWebinar";
import Pagination from "../../../components/paginationUser";
import JudulCTA from "../../../components/Judul";
import DeskripsiCta from "../../../components/Deskripsi";
import { Link } from "react-router-dom";
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

function SectionWebinar() {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axios.get("http://localhost:3001/webinar");
        setWebinars(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  const totalPages = Math.ceil(webinars.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return webinars.slice(startIndex, endIndex);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="bg-slate-50 dark:bg-gray-900">
      <div className="py-4 px-4 mx-auto max-w-screen-xl lg:px-6 lg:mb-0">
        <div className="mx-auto mt-4 max-w-screen-lg text-center mb-12">
          <JudulCTA>Webinar</JudulCTA>
          <DeskripsiCta>Berikut beberapa webinar atau sosialisasi yang diadakan oleh Parentify</DeskripsiCta>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-8 ">
          {renderData().map((webinar) => (
            <Link key={webinar.id} to={`/sharenting-webinar/${webinar.id}`} className="px-2 ">
              <CardWebinar imageSrc={`http://localhost:3001/uploads/${webinar.foto}`} title={webinar.judul} price={formatPrice(webinar.harga)} date={moment(webinar.tanggal).format("DD MMMM YYYY")} />
            </Link>
          ))}
        </div>
        {webinars.length > itemsPerPage && (
          <div className="flex justify-center mt-10 md:mt-16">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </section>
  );
}

export default SectionWebinar;
