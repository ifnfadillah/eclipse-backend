import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarHome = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  const [isEdukasiDropdownOpen, setIsEdukasiDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
    setIsEdukasiDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
      setIsDropdownOpen(true);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const isActiveLink = (path) => location.pathname === path;

  const isEdukasiActive = location.pathname.startsWith("/edukasi");
  const isKidspediaActive = location.pathname.startsWith("/kidspedia");
  const isSharentingActive = location.pathname.startsWith("/sharenting");
  const isArtikelActive = location.pathname.startsWith("/artikel");

  return (
    <nav className={`bg-gradient-to-t from-sky-900 to-sky-600 sticky top-4 lg:mx-24 mx-8 border-blue-200 dark:border-gray-600 dark:bg-gray-900 ${isDropdownOpen ? "rounded-3xl" : "rounded-full"} shadow-lg z-50`}>
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-5 px-12">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/assets/icon.png" className="h-12" alt="parentify-logo" />
          <span className="self-center text-2xl text-gray-50 font-semibold whitespace-nowrap dark:textWhite">Parentify</span>
        </Link>
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg lg:hidden hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="mega-menu-full"
          aria-expanded={isDropdownOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div id="mega-menu-full" className={`items-center justify-between ${isDropdownOpen ? "block" : "hidden"} w-full lg:flex lg:w-auto lg:order-1`}>
          <ul className="flex flex-col mt-4 text-xl font-medium md:flex-row md:mt-0 md:space-x-16 rtl:space-x-reverse">
            <li>
              <Link
                to="/"
                className={`block py-3 lg:py-2 px-3 border-b border-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:textWhite md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${
                  isActiveLink("/") ? "text-gray-50 lg:underline lg:underline-offset-8 lg:underline-mb-4 decoration-2 decoration-white" : "text-sky-200 hover:text-sky-300"
                }`}
                aria-current="page"
              >
                Beranda
              </Link>
            </li>
            <li>
              <button
                id="mega-menu-full-dropdown-button"
                onClick={toggleDropdown}
                data-collapse-toggle="mega-menu-full-dropdown"
                className={`flex items-center justify-between w-full px-3 py-3 lg:py-2 font-medium border-b border-gray-100 md:w-auto md:hover:bg-transparent md:border-0 md:p-0 dark:textWhite md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${
                  isEdukasiActive ? "text-gray-50 lg:underline lg:underline-offset-8 lg:underline-mb-4 decoration-2 decoration-white" : "text-sky-200 hover:text-sky-300"
                }`}
              >
                Edukasi{" "}
                <svg className={`w-2.5 h-2.5 ms-3 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {isEdukasiDropdownOpen && (
                <div
                  ref={dropdownRef}
                  id="mega-menu-full-dropdown"
                  className={`mt-5 shadow-sm rounded-b-3xl lg:hidden space-y-4 dark:bg-gray-900 transition-all duration-300 ${isDropdownOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <ul aria-labelledby="mega-menu-full-dropdown-button">
                    <li>
                      <Link to="/edukasi/panduan-asuh" className="flex flex-col items-center md:flex-row text-sky-200 hover:text-sky-300">
                        <div className="flex items-center">
                          <img className="object-cover h-auto w-16 lg:w-24 rounded-none rounded-s-lg" src="/assets/dropdown1.png" alt="" />
                          <div className="flex flex-col justify-between px-4 lg:px-8 leading-normal">
                            <div className="font-semibold text-lg">Panduan Pola Asuh Anak</div>
                            <span className="text-xs dark:text-gray-400">Panduan pola asuh sesuai rentang usia anak.</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/edukasi/gaya-parenting" className="flex flex-col items-center md:flex-row text-sky-200 hover:text-sky-300">
                        <div className="flex items-center">
                          <img className="object-cover h-auto w-16 lg:w-24 rounded-none rounded-s-lg" src="/assets/dropdown2.png" alt="" />
                          <div className="flex flex-col justify-between px-4 lg:px-8 leading-normal">
                            <div className="font-semibold text-lg">Gaya Parenting</div>
                            <span className="text-xs dark:text-gray-400">Gaya parenting dan perilakunya kepada anak</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/edukasi/kenali-gaya" className="flex flex-col items-center md:flex-row text-sky-200 hover:text-sky-300">
                        <div className="flex items-center">
                          <img className="object-cover h-auto w-16 lg:w-24 rounded-none rounded-s-lg" src="/assets/dropdown3.png" alt="" />
                          <div className="flex flex-col justify-between px-4 lg:px-8 leading-normal">
                            <div className="font-semibold text-lg">Kenali Gaya Parentingmu</div>
                            <span className="text-xs dark:text-gray-400">Quiz mengenali gaya parenting orang tua</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/kidspedia"
                className={`block py-3 lg:py-2 px-3 border-b border-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:textWhite md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${
                  isKidspediaActive ? "text-gray-50 lg:underline lg:underline-offset-8 lg:underline-mb-4 decoration-2 decoration-white" : "text-sky-200 hover:text-sky-300"
                }`}
              >
                Kidspedia
              </Link>
            </li>
            <li>
              <Link
                to="/sharenting"
                className={`block py-3 lg:py-2 px-3 border-b border-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:textWhite md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${
                  isSharentingActive ? "text-gray-50 lg:underline lg:underline-offset-8 lg:underline-mb-4 decoration-2 decoration-white" : "text-sky-200 hover:text-sky-300"
                }`}
              >
                Sharenting
              </Link>
            </li>
            <li>
              <Link
                to="/artikel"
                className={`block py-3 lg:py-2 px-3 border-b border-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:textWhite md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${
                  isArtikelActive ? "text-gray-50 lg:underline lg:underline-offset-8 lg:underline-mb-4 decoration-2 decoration-white" : "text-sky-200 hover:text-sky-300"
                }`}
              >
                Artikel
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        ref={dropdownRef}
        id="mega-menu-full-dropdown"
        className={`mt-1 shadow-sm rounded-b-3xl hidden lg:block  dark:bg-gray-900 transition-all duration-300 ${isDropdownOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="grid max-w-screen-xl px-10 lg:py-8 mx-auto dark:textWhite sm:grid-cols-2 md:grid-cols-3 lg:px-6 space-y-4 lg:space-y-0">
          <ul aria-labelledby="mega-menu-full-dropdown-button">
            <li>
              <Link to="/edukasi/panduan-asuh" className="flex flex-col items-center md:flex-row text-sky-200 hover:text-sky-300">
                <div className="flex items-center">
                  <img className="object-cover h-auto w-16 lg:w-24 rounded-none rounded-s-lg" src="/assets/dropdown1.png" alt="" />
                  <div className="flex flex-col justify-between px-4 lg:px-8 leading-normal">
                    <div className="font-semibold">Panduan Pola Asuh Anak</div>
                    <span className="text-sm dark:text-gray-400">Panduan pola asuh sesuai rentang usia anak.</span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/edukasi/gaya-parenting" className="flex flex-col items-center md:flex-row text-sky-200 hover:text-sky-300">
                <div className="flex items-center">
                  <img className="object-cover h-auto w-16 lg:w-24 rounded-none rounded-s-lg" src="/assets/dropdown2.png" alt="" />
                  <div className="flex flex-col justify-between px-4 lg:px-8 leading-normal">
                    <div className="font-semibold">Gaya Parenting</div>
                    <span className="text-sm dark:text-gray-400">Gaya parenting dan perilakunya kepada anak</span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/edukasi/kenali-gaya" className="flex flex-col items-center md:flex-row text-sky-200 hover:text-sky-300">
                <div className="flex items-center">
                  <img className="object-cover h-auto w-16 lg:w-24 rounded-none rounded-s-lg" src="/assets/dropdown3.png" alt="" />
                  <div className="flex flex-col justify-between px-4 lg:px-8 leading-normal">
                    <div className="font-semibold">Kenali Gaya Parentingmu</div>
                    <span className="text-sm dark:text-gray-400">Quiz mengenali gaya parenting orang tua</span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
