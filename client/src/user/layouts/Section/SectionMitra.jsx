import React, { useState, useEffect } from "react";
import axios from "axios";
import Deskripsi from "../../components/Deskripsi";
import Judul from "../../components/Judul";
import CardMitra from "../../components/CardMitra";

const SectionMitra = () => {
  const [mitras, setMitras] = useState([]);

  useEffect(() => {
    const fetchMitras = async () => {
      try {
        const response = await axios.get("http://localhost:3001/mitra");
        setMitras(response.data);
      } catch (error) {
        console.error("Error fetching mitras:", error);
      }
    };

    fetchMitras();
  }, []);

  return (
    <div className="px-4 mx-auto max-w-screen-xl py-16 lg:px-6">
      <div className="mx-auto max-w-screen-lg text-center">
        <Judul>Mitra Kami</Judul>
        <Deskripsi>
          Berikut beberapa mitra atau yayasan terpercaya yang bekerja sama
          dengan Parentify:
        </Deskripsi>
      </div>
      <div className="flex items-center justify-center py-4">
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0">
          {mitras.map((mitra) => (
            <CardMitra
              key={mitra.id}
              imgUrl={`http://localhost:3001/uploads/${mitra.logo}`}
              nama={mitra.nama}
              width="100"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionMitra;
