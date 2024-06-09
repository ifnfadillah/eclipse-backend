const CardGizi = ({ judul, desc }) => {
  return (
    <div className="w-full max-w-sm px-4 py-5 md:px-6 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center justify-center py-4">
        <h5 className="text-2xl mt-4 font-medium text-neutral-800 dark:text-white ">{judul}</h5>
        <div className="text-base flex mt-2 font-normal text-center text-zinc-700">
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default CardGizi;
