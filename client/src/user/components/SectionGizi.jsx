import Deskripsi from "./Deskripsi";
import Judul from "./Judul";
import JudulFitur from "./JudulFitur";

const SectionGizi = ({ usia, children }) => {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 ">
      <div className="mx-auto max-w-screen-lg text-center mb-12 ">
        <Judul>
          Asupan <JudulFitur>Gizi</JudulFitur>
        </Judul>
        <Deskripsi>Berikut merupakan asupan gizi yang harus terpenuhi pada anak {usia}</Deskripsi>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-8 px-8 md:px-0">{children}</div>
    </div>
  );
};

export default SectionGizi;
