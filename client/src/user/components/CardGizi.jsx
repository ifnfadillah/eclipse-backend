const CardGizi = ({ judul, desc }) => {
  return (
    <div className="w-full max-w-md px-8 py-8 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
      <div className="text-center">
        <h5 className="text-3xl font-medium text-neutral-800 dark:text-white">{judul}</h5>
        <p className="text-lg mt-4 font-normal text-zinc-700 dark:text-zinc-300">{desc}</p>
      </div>
    </div>
  );
};

export default CardGizi;
