import { useEffect } from "react";
import NavbarHome from "../components/Navbar/NavbarHome";
import SectionQuiz from "../layouts/Section/SectionQuiz";

const Quiz = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="quiz">
      <NavbarHome />
      <SectionQuiz />
    </div>
  );
};

export default Quiz;
