const CardMewarnai = (props) => {
  const { title, imageUrl, link } = props;
  return (
    <a href={link}>
      <div className="max-w-xl bg-white border  border-gray-200 rounded-xl shadow hover:shadow-xl dark:bg-gray-800  dark:border-gray-700">
        <img className=" w-full h-full" src={imageUrl} alt={title} />
        <div className="p-2.5 bg-sky-700 text-white text-center rounded-b-lg hover:bg-sky-500">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <h5 className="md:py-2 md:text-2xl font-semibold font-primary tracking-tight text-white dark:text-white">{title}</h5>
          </a>
        </div>
      </div>
    </a>
  );
};

export default CardMewarnai;
