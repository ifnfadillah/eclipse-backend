import Judul from "../components/Judul";
import Deskripsi from "../components/Deskripsi";
import CardFitur from "../components/CardFitur";
import { Link } from "react-router-dom";

const FeaturesKidspedia = () => {
  return (
    <div className="fitur-kidspedia">
      <section className="bg-slate-50 dark:bg-gray-900">
        <div className=" mt-16 mb-8 px-4 mx-auto max-w-screen-xl lg:px-6">
          <div className="mx-auto max-w-screen-lg text-center mb-12 ">
            <Judul>Pilih Bahan Belajar </Judul>
            <Deskripsi>Lakukan pendampingan bahan belajar dari kidspedia untuk menunjang tumbuh kembang anakmu Parennials. Pilih bahan belajar yang sesuai di bawah ini!</Deskripsi>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <Link to="/kidspedia/video">
              <CardFitur imgUrl="/assets/videoPembelajaran.png" judul="Video Belajar" deskripsi="Kumpulan video belajar untuk menunjang sensorik dan motorik anak." />
            </Link>
            <Link to="/kidspedia/mewarnai">
              <CardFitur imgUrl="/assets/lembarMewarnai.png" judul="Lembar Mewarnai" deskripsi="Kumpulan lembar mewarnai untuk melatih kreativitas pada anak." />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesKidspedia;
