import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/paginationUser";
import JudulCTA from "../../components/Judul";
import DeskripsiCta from "../../components/Deskripsi";
import CardKomunitas from "@/user/components/CardKomunitas";
import { Link } from "react-router-dom";

function SectionKomunitas() {
  const [communitys, setCommunitys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCommunitys = async () => {
      try {
        const response = await axios.get("http://localhost:3001/komunitas");
        setCommunitys(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunitys();
  }, []);

  const totalPages = Math.ceil(communitys.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll ke atas setiap kali komponen di-render
  }); // Tidak ada dependensi, jadi hanya terjadi saat pertama kali komponen di-mount

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return communitys.slice(startIndex, endIndex);
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
          <JudulCTA>Komunitas</JudulCTA>
          <DeskripsiCta>
            Berikut beberapa komunitas untuk diskusi yang ada di Parentify
          </DeskripsiCta>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-8">
          {renderData().map((community) => (
            <Link
              key={community.id}
              to={`/sharenting-komunitas/${community.id}`}
              className="px-2"
            >
              <CardKomunitas
                imageSrc={`http://localhost:3001/uploads/${community.foto}`}
                title={community.nama}
              />
            </Link>
          ))}
        </div>
        {communitys.length > itemsPerPage && (
          <div className="flex justify-center mt-10 md:mt-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default SectionKomunitas;
