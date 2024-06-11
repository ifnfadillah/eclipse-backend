const CardVideo = ({ imageUrl, title, link }) => {
  return (
    <a href="#" className="cursor-pointer block">
      <div className="max-w-full relative border-gray-200 rounded-lg shadow-2xl hover:shadow-xl mx-auto">
        <img className="w-full h-40 object-cover md:h-32 lg:h-48 rounded-t-lg" src={imageUrl} alt={title} />
        <div className="p-4 bg-sky-700 text-white text-left mx-auto hover:bg-sky-500 rounded-b-lg">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <h5 className="text-base md:text-xl font-semibold font-primary tracking-tight text-white"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.5em",
                maxHeight: "3em",
              }}>{title}</h5>
          </a>
        </div>
      </div>
    </a>
  );
};

export default CardVideo;

