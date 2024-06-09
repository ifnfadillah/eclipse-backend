const Banners = (props) => {
  const { imgUrl } = props;
  return (
    <div className="flex justify-center items-center w-full">
      <section>
        <div className="px-6 mx-auto max-w-screen-xl py-12 lg:py-14">
          <img src={imgUrl} className="shadow-lg rounded-xl w-full h-auto" />
        </div>
      </section>
    </div>
  );
};

export default Banners;
