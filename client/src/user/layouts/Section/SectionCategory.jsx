import JudulFitur from "../../components/JudulFitur";
import CardCategory from "../../components/CardCategory";
import Judul from "../../components/Judul";
import Deskripsi from "../../components/Deskripsi";
import { Link } from "react-router-dom";
import { polaAsuh } from "../Data/polaAsuh";

const SectionCategory = () => {
  return (
    <div className="section-kategori-usia">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-lg text-center mb-12">
          <Judul>
            Pilih
            <JudulFitur> Panduan Pola Asuh</JudulFitur>
          </Judul>
          <Deskripsi>Kami mengelompokkkan beberapa panduan pola asuh anak dalam beberapa fase rentang usia anak. Pilih panduan pola asuh yang sesuai buah hatimu yang Parennials!</Deskripsi>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {polaAsuh.slice(0, 3).map((pola) => (
              <Link key={pola.id} to={`/edukasi/panduan-asuh/${pola.id}`}>
                <CardCategory title={pola.category} description={pola.description} imageUrl={pola.imageCard} />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <div className="gap-y-8  gap-x-8 grid grid-cols-2 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 md:gap-12 md:space-y-0">
            {polaAsuh.slice(3).map((pola) => (
              <Link key={pola.id} to={`/edukasi/panduan-asuh/${pola.id}`}>
                <CardCategory title={pola.category} description={pola.description} imageUrl={pola.imageCard} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCategory;
