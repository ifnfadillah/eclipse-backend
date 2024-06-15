import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardKomunitas from "../components/CardKomunitas";
import LayoutUser from "../layout";
import axios from "axios";

function DetailKomunitas() {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [displayedCommunities, setDisplayedCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/komunitas/${id}`);
        setCommunity(response.data);
      } catch (error) {
        console.error("Error fetching community:", error);
      }
    };

    fetchCommunity();
  }, [id]);

  useEffect(() => {
    const fetchOtherCommunities = async () => {
      try {
        const response = await axios.get("http://localhost:3001/komunitas");
        const filteredCommunities = response.data.filter((c) => c.id !== parseInt(id));
        const shuffledCommunities = filteredCommunities.sort(() => Math.random() - 0.5).slice(0, 4);
        setDisplayedCommunities(shuffledCommunities);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchOtherCommunities();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!community) {
    return <div>Komunitas tidak ditemukan</div>;
  }

  return (
    <LayoutUser>
      <div className="w-full mt-5 sm:px-8 py-10 flex flex-col items-center gap-12">
        <div className="flex flex-col md:flex-row items-center px-8">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <img src={`http://localhost:3001/uploads/${community.foto}`} alt={community.nama} className="w-full h-auto rounded-xl" />
          </div>
          <div className="w-full md:w-2/3 md:px-24 space-y-4 md:space-y-8">
            <h2 className="text-2xl md:text-5xl font-bold">{community.nama}</h2>
            <p className="text-gray-700 font-secondary text-xs md:text-sm">{community.deskripsi}</p>
            <button
              className="w-full inline-flex items-center justify-center md:w-auto md:px-5 py-3 font-primary text-sm font-medium bg-sky-700 rounded-lg md:rounded-xl shadow border-2 text-white hover:bg-sky-900"
              type="button"
              name="daftar"
            >
              <a href={community.link_daftar} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Daftar Sekarang
                <svg className="w-5 h-5 ml-2 -mr-1 transition duration-300 ease-in-out" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </a>
            </button>
          </div>
        </div>
      </div>

      <div className="container max-w-screen-xl sm:py-8">
        <div className="flex flex-row justify-between mb-10 text-center sm:text-left items-center">
          <h1 className="lg:text-3xl text-2xl font-primary font-semibold ">Komunitas Lainnya</h1>
          <button
            className="px-3 py-2 text-xs md:px-5 md:py-3 font-secondary md:text-sm font-medium bg-white rounded-lg md:rounded-xl shadow border-2 border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-white hover:border-sky-700"
            type="navigate"
            name="selengkapnya"
          >
            <Link to="/sharenting-komunitas" className="flex items-center">
              Selengkapnya
              <svg className="w-5 h-5 ml-2 -mr-1 transition duration-300 ease-in-out" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-4">
          {displayedCommunities.map((community) => (
            <Link key={community.id} to={`/sharenting-komunitas/${community.id}`} className="mx-2">
              <CardKomunitas imageSrc={`http://localhost:3001/uploads/${community.foto}`} title={community.nama} />
            </Link>
          ))}
        </div>
      </div>
    </LayoutUser>
  );
}

export default DetailKomunitas;
