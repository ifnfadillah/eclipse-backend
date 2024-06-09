import { useState } from "react";
import { lembarMewarnai } from "../Data/lembarMewarnai";
import Pagination from "@/user/components/paginationUser";
import Judul from "@/user/components/Judul";
import Deskripsi from "@/user/components/Deskripsi";
import { Link } from "react-router-dom";
import CardMewarnai from "@/user/components/CardMewarnai";

const SectionGambar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(lembarMewarnai.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return lembarMewarnai.slice(startIndex, endIndex);
  };

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
              <CardMewarnai imageUrl={gambar.imageCard} title={gambar.title} link={gambar.link} />
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
