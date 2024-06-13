const CardMitra = ({ imgUrl, nama, deskripsi }) => {
  return (
    <div className="max-w-md sm:max-w-lg px-10 py-8 md:px-10 border border-gray-300 rounded-lg shadow-xl">
      <div className="flex justify-center">
        <img className="w-full h-auto object-cover" src={imgUrl} alt={nama} />
      </div>
      <div className="p-5 text-center text-zinc-700">
        <h5 className="text-2xl font-primary font-medium tracking-tight">{nama}</h5>
        <p className="text-lg font-secondary px-2 mt-4">{deskripsi}</p>
      </div>
    </div>
  );
};

export default CardMitra;
