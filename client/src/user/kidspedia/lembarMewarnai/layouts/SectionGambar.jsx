import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "@/user/components/paginationUser";
import Judul from "@/user/components/Judul";
import Deskripsi from "@/user/components/Deskripsi";
import CardMewarnai from "@/user/components/CardMewarnai";

const SectionGambar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lembarMewarnai, setLembarMewarnai] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchGambar = async () => {
      try {
        const response = await axios.get("http://localhost:3001/kidspedia");
        const filteredData = response.data.filter((gambar) => gambar.kategori_id === 2);
        setLembarMewarnai(filteredData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGambar();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return lembarMewarnai.slice(startIndex, endIndex);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalPages = Math.ceil(lembarMewarnai.length / itemsPerPage);

  return (
    <div className="section-kategori-usia">
      <div className="py-4 px-4 mx-auto max-w-screen-xl lg:px-6 lg:mb-0">
        <div className="mx-auto mt-4 max-w-screen-lg text-center mb-12">
          <Judul>Lembar Mewarnai</Judul>
          <Deskripsi>Berikut beberapa lembar mewarnai yang dapat diakses oleh Parennials!</Deskripsi>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-8">
          {renderData().map((gambar) => (
            <Link key={gambar.id} to={gambar.link} className="flex items-center px-2">
              <CardMewarnai imageUrl={`http://localhost:3001/uploads/${gambar.foto}`} title={gambar.judul} link={gambar.link} />
            </Link>
          ))}
        </div>
        {lembarMewarnai.length > itemsPerPage && (
          <div className="flex justify-center mt-10 md:mt-16">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionGambar;
