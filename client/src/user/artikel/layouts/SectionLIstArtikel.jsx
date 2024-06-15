import React, { useState, useEffect } from "react";
import axios from "axios";
import CardArtikel from "../../components/cardArtikel";
import JudulFitur from "../../components/JudulFitur";
import Pagination from "../../components/paginationUser";
import { Link } from "react-router-dom";
import moment from "moment";

function ArtikelList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/artikel");
        setArticles(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderData = () => {
    if (!Array.isArray(articles)) return [];
    const sortedArticles = articles.sort(
      (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedArticles.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(articles.length / itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="py-16 md:py-8 px-4 mx-auto max-w-screen-xl lg:px-6">
      <div className="mx-auto max-w-screen-lg text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-primary mb-3">
          <span className="font-semibold">Kumpulan </span>
          <JudulFitur>Artikel</JudulFitur>
        </h1>
        <p className="text-lg font-primary sm:text-xl mb-6">
          Simak beberapa kumpulan artikel di bawah ini
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-8">
        {renderData().map((article) => (
          <Link key={article.id} to={`/artikel/${article.id}`} className="mx-2">
            <CardArtikel
              imageSrc={`http://localhost:3001/uploads/${article.foto}`}
              title={article.judul}
              description={article.isi}
              date={moment(article.tanggal).format("DD MMMM YYYY")}
            />
          </Link>
        ))}
      </div>
      {articles.length > itemsPerPage && (
        <div className="flex justify-center mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default ArtikelList;
